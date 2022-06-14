let result = [], randomResult = []

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

for (let index = 0; index < 999; index++) {
    let rand = Math.floor(Math.random() * 25)
    if (rand < 10) rand = `0${rand}`
    let data = '04' + rand

    result.push(data)
}


return console.log(result.filter(onlyUnique));