const dataTemplate = [
  {
    "id": 1,
    "type": "Кардио",
    "cover": {
      "image": "/i/media/stat/prof-trains/img/trainers/treadmills/cover.jpg",
      "image2x": "/i/media/stat/prof-trains/img/trainers/treadmills/cover@2x.jpg",
      "imageWebp": "/i/media/stat/prof-trains/img/trainers/treadmills/cover.webp 1x, /i/media/stat/prof-trains/img/trainers/treadmills/cover@2x.webp 2x"
    },
    "content": []
  },
  {
    "id": 2,
    "type": "Мультистанции",
    "cover": {
      "image": "/i/media/stat/prof-trains/img/trainers/multi/cover.jpg",
      "image2x": "/i/media/stat/prof-trains/img/trainers/multi/cover@2x.jpg",
      "imageWebp": "/i/media/stat/prof-trains/img/trainers/multi/cover.webp 1x, /i/media/stat/prof-trains/img/trainers/multi/cover@2x.webp 2x"
    },
    "content": []
  },
]
const getDataStructure = (products) => {
  const dataStructure = dataTemplate.map((item, index) => {
    item.content= products[index]
    return item;
  })
  return dataStructure;
}

export { getDataStructure }
