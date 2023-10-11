__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}
const { ytMp4, ytMp3 } = require('../lib/y2mate')
const { openai } = require("../lib/openai.js")
const { toanime, tozombie } = require("../lib/turnimg.js")
//const sanz = require("../lib/sanzyy-api")
const sanzyy = require('sanzyy-api')
const zexx = require("../lib/listdl")
let mmk = ["Zexxa","Kira-Master","ZexxaDevID"]
let creator = mmk[Math.floor(Math.random() * mmk.length)]
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router  = express.Router();
let hxz = require('hxz-api')
let nhentai = require('nhentai-js');
let NanaAPI = require('nana-api')
let nana = new NanaAPI()
let { tiktok, pinterest, mediafireDl, doujindesu, pinterestdl } = require('../lib/index') 
let options = require(__path + '/lib/options.js');
let { color, bgcolor } = require(__path + '/lib/color.js');
let { getBuffer, fetchJson } = require(__path + '/lib/fetcher.js');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

loghandler = {
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukan URL'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'Masukkan query'
    },
    error: {
        status: 404,
        creator: `${creator}`,
        message: 'An internal error occurred. Please report via WhatsApp wa.me/628828642151'
    },
}
		
		// Downloader
router.get('/fbdown', async (req, res) => {
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter url"})  
zexx.fbdown(url).then(data => {
	if (!data.Normal_video ) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
})

		
    router.get('/tiktok', async(req, res) => {
	      let url = req.query.url
	      if (!url) return res.json(loghandler.noturl)
	      let result = await zexx.musically(url)
	      try {
		  res.json({
			  status: 200,
			  creator: `${creator}`,
              note: 'Jangan Di Tembak Bang',
              result
          })
	   } catch(err) {
		    console.log(err)
		    res.json(loghandler.error)
	     }
    })
		router.get('/igstorydowloader', async (req, res) => {
	var username = req.query.username
	if (!username ) return res.json({ status : false, creator : `${creator}`, message : "[!] masukan parameter username"})   

	fetch('https://api.zahwazein.xyz/downloader/instagram/story?apikey=zenzkey_8bc01f5847&username='+username)
		.then(response => response.json())
		.then(async (data) => {
			var result = data.result
		res.json({
			status: 200,
	        creator: `${creator}`,
			result: result
	    })
	})
})
    router.get('/igdl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     try {
	     fetch('https://api.akuari.my.id/downloader/igdl2?link=' + url)
		.then(response => response.json())
		.then(async (data) => { 
		var result = data.respon
		res.json({
			status: 200,
	        creator: `${creator}`,
			result: result
	    })
	})
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
     router.get('/mediafire', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await zexx.mediafireDl(url)
	     try {
	     res.json({
			  status: 200,
			  creator: `${creator}`,
              note: 'Jangan Di Tembak Bang',
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
     router.get('/youtube', async(req, res) => {
	     let url = req.query.url
	     try {
	     var mp3 = await ytMp3(url)
	var mp4 = await ytMp4(url)
	if (!mp4 || !mp3) return res.json(loghandler.noturl)
	limitapikey(req.query.apikey)
		res.json({
			status: 200,
			creator: `${creator}`,
			result:{ 
			title: mp4.title,
			desc: mp4.desc,
			thum: mp4.thumb,
			view: mp4.views,
			channel: mp4.channel,
			uploadDate: mp4.uploadDate,
			mp4:{
				result: mp4.result,
				size: mp4.size,
				quality: mp4.quality
			},
			mp3:{
				result: mp3.result,
				size: mp3.size
			}
		 }
	   })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
     router.get('/twitter', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await zexx.twitter(url)
	     try {
	     res.json({
			  status: 200,
			  creator: `${creator}`,
              note: 'Jangan Di Tembak Bang',
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
     router.get('/pindl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await pinterestdl(url)
	     try {
	     res.json({
			  status: 200,
			  creator: `${creator}`,
              note: 'Jangan Di Tembak Bang',
              result
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
      
      // Searching
      router.get('/pinterest', async(req, res) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let result = await zexx.pinterest(query)
	      res.json({ 
		       status: 200,
		       creator: `${creator}`,
               note: 'Jangan Di Tembak Bang',
               result 
           })
      })
      router.get('/google', async (req, res, next) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let google = require('google-it')
	      let result = google({'query': query}).then(result => {
	      res.json({ 
		       status: 200,
		       creator: `${creator}`,
               note: 'Jangan Di Tembak Bang',
               result 
           })
        .catch(e => {
         	 res.json(loghandler.error)
           })
       })
   })
         // Animanga
         router.get('/nhentai', async (req, res, next) => {
             code = req.query.code
             if(!code) return res.json({ message: 'masukan parameter Code' })
             result = await nhentai.getDoujin(code)
             res.json({
                  status: 200,
                  creator: `${creator}`,
                  note: 'Jangan Di Tembak Bang',
                  result
             })
            .catch(e => {
            	res.json(loghandler.error)
           })
      })
      router.get('/nHentaiSearch', async (req, res) => {
            let query = req.query.query
            let hasil = await nana.search(query)
            let result = hasil.results
		    res.json({
                 status: 200,
                 creator: `${creator}`,
                 note: 'Jangan Di Tembak Bang',
                 result
            })
       })
       router.get('/doujindesuSearch', async (req, res) => {
             let query = req.query.query
             let result = await doujindesu(query)
             res.json({
                  status: 200,
                  creator: `${creator}`,
                  note: 'Jangan Di Tembak Bang',
                  result
              })
         })
         
         // Random Image
          router.get('/randomimage/waifu', async (req, res, next) => {
              fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
             .then(response => response.json())
             .then(async data => {
                  let result = data;
                  let buffer = await fetch(data.url)
                  res.type('png')
                  res.send(await buffer.buffer())
              })
           .catch(e => {
            	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/neko', async (req, res, next) => {
            fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
           .then(response => response.json())
           .then(async data => {
                let result = data;
                let buffer = await fetch(data.url)
                res.type('png')
                res.send(await buffer.buffer())
            })
           .catch(e => {
           	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/husbu', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/loli', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/milf', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/cosplay', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
            let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
     
 router.use(function (req, res) {
     res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
