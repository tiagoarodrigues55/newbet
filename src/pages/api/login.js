

export default async function handler(req, res){
  return res.json({
    balance: 100,
    user: {
      name: 'Tiago',
      email: 'tiago.americano.03@gmail.com'
    },
    token: 'AAAAAAAAAAAAAAAAa'
  })
}