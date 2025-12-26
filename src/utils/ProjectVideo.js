const videoFiles = import.meta.glob(
    "/src/assets/videos/projectVideos/*.mp4", {eager:true}
);

export const videos = Object.entries(videoFiles).map(([path, module], index)=>({
    id: index+1,
    title: path.split("/").pop().replace(".mp4", ""),
    src: module.default
}))

export const video = [
          {id: 1, title: "Food1"},
          {id: 7, title: "Snitch"},
          {id: 2, title: "Food2"},
          {id: 6, title: "Snitch"},
          {id: 3, title: "Food3"},
          {id: 4, title: "ViGe"},
          {id: 5, title: "Food4"},
          {id:8, title:"Bonjour Men's Socks"}
]