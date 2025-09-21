// httpOnly in headers
// Secure in headers with process.env.NODE_ENV  = 'production' => only sent over https
// SameSite in headers => only sent in the same domain
// Domain in headers => only sent in the same domain
// Path in headers => only sent in the same path

// use DOMPurify to sanitize the HTML
// Same Origin <> Same Site, Origin => protocol, domain, port, site = site + 1 subdomain
