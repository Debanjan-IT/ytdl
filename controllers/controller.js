const getData = async(req, res) => {
    try {
        const ytdl = require('ytdl-core');
        const {yt_url, type} = req.query
        const video_id = ytdl.getURLVideoID(yt_url)
        let info = await ytdl.getInfo(video_id)

        const maudio = info.formats.filter(e => e.mimeType.includes('audio')).map(e => {
            return {
                title: info.videoDetails.title,
                audio_quality: `${e.audioBitrate}kbps`,
                link: e.url
            }
        })

        const mvideo = info.formats.filter(e => e.mimeType.includes('video')&& e.hasAudio && e.container == 'mp4').map(e => {
            return {
                title: info.videoDetails.title,
                video_quality: e.qualityLabel,
                link: e.url,
                hasAudio: e.hasAudio
            }
        })
        const audio = await Promise.all(maudio)
        const video = await Promise.all(mvideo)
        let data = {}
        if (type == 'all') {
            data = {
                audio,
                video
            }
        } else if (type == 'audio') {
            data = {
                audio
            }
        } else if (type == 'video') {
            data = {
                video
            }
        }
        return {data, message: 'Success'}
    } catch (error) {
        console.log(error);
    }
}

const resp = async(req, res) => {
    return {message: 'Success'}
}
module.exports = {
    getData,
    resp
}
