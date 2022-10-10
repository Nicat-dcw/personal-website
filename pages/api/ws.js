
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const get = new WebSocket("wss://cdn.nicat-dcw.xyz/img/test.jpg")
  res.status(200).json({ name: get })
}
