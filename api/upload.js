export default async function handler(req, res) {
if (req.method !== "POST")
return res.status(405).json({ message: "Method not allowed" });


const { filename, content } = req.body;


const repo = "USERNAME/NAMA_REPO"; // Ganti
const token = process.env.GITHUB_TOKEN; // Set di Vercel ENV


const upload = await fetch(
`https://api.github.com/repos/${repo}/contents/${filename}`,
{
method: "PUT",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
message: `Upload ${filename}`,
content: content
})
}
);


const result = await upload.json();


if (result.content) {
res.status(200).json({ message: "Upload berhasil!" });
} else {
res.status(500).json({ message: "Gagal upload", error: result });
}
}
