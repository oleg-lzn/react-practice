/* ============================================================
 🧠 MONGOOSE CHEATSHEET — CRUD, POPULATE, ObjectId
============================================================ */

import mongoose from "mongoose";

// ===============================
// 1️⃣ Подключение
// ===============================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ===============================
// 2️⃣ Пример схемы с ObjectId и связью (ref)
// ===============================
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Habit относится к User (один пользователь — много привычек)
const habitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  frequency: { type: String, default: "daily" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 ObjectId + ref
});

export const User = mongoose.model("User", userSchema);
export const Habit = mongoose.model("Habit", habitSchema);

// ============================================================
// ⚙️ 3️⃣ CRUD ПРИМЕРЫ
// ============================================================

// ✅ CREATE
export const createUser = async () => {
  const user = await User.create({
    name: "Oleg",
    age: 31,
    email: "oleg@example.com",
  });
  console.log("✅ User created:", user);
};

// ✅ READ (все пользователи)
export const getUsers = async () => {
  const users = await User.find().lean(); // lean → вернёт “чистые” объекты JS
  console.log(users);
};

// ✅ READ (по ID)
export const getUserById = async id => {
  const user = await User.findById(id);
  console.log(user);
};

// ✅ UPDATE
export const updateUser = async (email, newData) => {
  const updated = await User.findOneAndUpdate({ email }, newData, {
    new: true,
  });
  console.log("✅ Updated user:", updated);
};

// ✅ DELETE
export const deleteUser = async id => {
  await User.findByIdAndDelete(id);
  console.log("❌ User deleted");
};

// ============================================================
// 🔍 4️⃣ ФИЛЬТРАЦИЯ / СОРТИРОВКА / ПАГИНАЦИЯ
// ============================================================

// 🔹 Найти активных пользователей, отсортировать и ограничить
export const getActiveUsers = async () => {
  const users = await User.find({ isActive: true })
    .sort({ createdAt: -1 }) // последние сверху
    .limit(5)
    .skip(0); // пагинация
  console.log(users);
};

// 🔹 Найти пользователей по диапазону возраста
export const getAdults = async () => {
  const users = await User.find({ age: { $gte: 18, $lte: 65 } });
  console.log(users);
};

// 🔹 Поиск по части имени (регулярка)
export const searchByName = async query => {
  const users = await User.find({ name: { $regex: query, $options: "i" } });
  console.log(users);
};

// ============================================================
// 🔗 5️⃣ POPULATE (связи между коллекциями)
// ============================================================

// Создать привычку для пользователя
export const createHabit = async (userId, title) => {
  const habit = await Habit.create({
    title,
    user: userId, // 👈 передаём ObjectId пользователя
  });
  console.log("✅ Habit created:", habit);
};

// Получить привычку с данными пользователя (JOIN-подобный запрос)
export const getHabitWithUser = async habitId => {
  const habit = await Habit.findById(habitId).populate("user"); // 👈 populate
  console.log("📦 Habit with user info:", habit);
};

// Получить пользователя со всеми его привычками
export const getUserWithHabits = async userId => {
  const user = await User.findById(userId).populate("habits"); // если добавить virtual (см. ниже)
  console.log("👤 User with habits:", user);
};

// ============================================================
// 🧩 6️⃣ VIRTUAL POPULATE (обратная связь)
// ============================================================
// Чтобы можно было вызывать user.populate('habits')

userSchema.virtual("habits", {
  ref: "Habit",
  localField: "_id",
  foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// Теперь можно делать:
export const getUserFull = async id => {
  const user = await User.findById(id).populate("habits");
  console.log("User + habits:", user);
};

// ============================================================
// ⚡ 7️⃣ ПРОЧЕЕ
// ============================================================

// 🔹 Проверить, существует ли пользователь
export const userExists = async email => {
  const exists = await User.exists({ email });
  console.log(exists ? "✅ Exists" : "❌ Not found");
};

// 🔹 Подсчитать количество
export const countUsers = async () => {
  const count = await User.countDocuments({ isActive: true });
  console.log("Active users:", count);
};

// 🔹 Массовое обновление
export const deactivateAll = async () => {
  await User.updateMany({}, { $set: { isActive: false } });
  console.log("🚫 All users deactivated");
};

// 🔹 Увеличить значение (например, возраст на 1)
export const incrementAge = async email => {
  await User.updateOne({ email }, { $inc: { age: 1 } });
  console.log("📈 Age incremented");
};

// ============================================================
// ✅ 8️⃣ ObjectId helper
// ============================================================

export const toObjectId = id => new mongoose.Types.ObjectId(id);

// пример использования:
// const userId = toObjectId("674f8e8a7f5c13b85a0b1234");

// ============================================================
// 💡 ПРИМЕЧАНИЕ
// - ObjectId используется для связей между документами (ref).
// - populate выполняет “JOIN” между коллекциями.
// - virtual populate позволяет получать обратные связи.
// ============================================================
