// Клиент твилио для отправки смс с кодом
import twilio from "twilio";
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const user = await User.findOne({ email });
const passwordValid = await bcrypt.compare(password, user.hashedPassword);

if (!passwordValid) {
  return res.status(401).json({ message: "Invalid credentials" });
}

// генерируем код
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// сохраняем во временное поле пользователя
user.tempOtp = otp;
user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 минут
await user.save();

// отправляем SMS
await client.messages.create({
  body: `Your login code is ${otp}`,
  from: "+1234567890", // твой Twilio номер
  to: user.phone,
});

return res.json({ message: "OTP sent" });

// 🔹 Этап 2 — пользователь вводит код

// c клиента
// /verify-otp
await fetch("/api/verify-otp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, otp }),
});

// на сервере
const user = await User.findOne({ email });
const { enteredCode } = req.body.otp;

if (!user || !user.tempOtp || Date.now() > user.otpExpires) {
  return res.status(400).json({ message: "OTP expired or invalid" });
}

if (user.tempOtp !== enteredCode) {
  return res.status(400).json({ message: "Incorrect code" });
}

// очистить одноразовый код
user.tempOtp = null;
user.otpExpires = null;
await user.save();

// выдаем JWT
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
res.json({ token });
