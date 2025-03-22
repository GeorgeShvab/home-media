// import { Router } from 'express'
// import Torrent from 'torrent-stream'
// import path from 'path'
// import fs from 'fs'
// import { encode } from 'magnet-uri'

// const router = Router()

// const dirname = path.resolve()

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// router.get('/movie/:movieId', (req, res) => {
//   res.send(`Movie id: ${req.params.movieId}`)
// })

// router.get('/movie/:movieId/watch', async (req, res) => {
//   console.log('START')
//   const stream = Torrent(
//     encode({ xt: `urn:btih:A6168BA3FD8A6E5C0F033ED39BA6117BD98E768C` })
//   )

//   console.log(stream)

//   stream.on('ready', () => {
//     stream.files.forEach((file) => {
//       const stream = file.createReadStream()
//       console.log(file)
//       stream.pipe(
//         fs.createWriteStream(path.join(dirname, 'static', 'movies', file.name))
//       )
//     })
//   })

//   stream.on('download', (index) => {
//     console.log(index)
//   })

//   res.send(`Movie id: ${req.params.movieId}`)
// })

// export default router
