const readline = require("readline")
const dataSets = require('./data.json')
const { performance } = require("perf_hooks")

// init variables
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// init main
main()

function main () {
    input.question("(1) Greedy \n(2) Brute Force \n(3) Compare both of them \n(4) Quit \nWhich one would you use? ", function (answer) {
        // initiate output
        let output = null

        // dummy data (represent time)
        // let arr = [900, 940, 950, 1100, 1500, 1800]
        // let dep = [910, 1200, 1120, 1130, 1900, 2000]

        // dummy data (represent time)
        let arr = dataSets.arr
        let dep = dataSets.dep

        if (answer == 1) output = findPlatformGreedy(arr, dep, arr.length)
        else if (answer == 2) output = findPlatformBruteForce(arr, dep, arr.length)
        else if (answer == 3) { // if want to comparing both of algorithm
            let greedy = findPlatformGreedy(arr, dep, arr.length)
            let brute = findPlatformBruteForce(arr, dep, arr.length)

            console.log(`\nExecution time : ${greedy.time} millisecond \nMinimum Number of Platforms Required (greedy) : ${greedy.result} \n\nExecution time : ${brute.time} millisecond \nMinimum Number of Platforms Required (Brute Force) : ${brute.result} \n\n`)

            return main()
        } else return console.log("---The end---")

        console.log(`\nMinimum Number of Platforms Required : ${output.result}`)
        console.log(`Execution time : ${output.time} millisecond \n`)

        return main()
    })
}


// Algoritma Brute Force
let findPlatformBruteForce = function (arr, dep, n) {
    // start timer
    startTime = performance.now()

    // plat_needed indicates number of platforms
    // needed at a time
    var plat_needed = 1,
        result = 1
    var i = 1,
        j = 0

    // run a nested loop to find overlap
    for (var i = 0; i < n; i++) {
        // minimum platform
        plat_needed = 1

        for (var j = i + 1; j < n; j++) {
            // check for overlap
            if (Math.max(arr[i], arr[j]) <= Math.min(dep[i], dep[j])) plat_needed++
        }

        // update result
        result = Math.max(result, plat_needed)
    }

    // end timer
    endTime = performance.now()
    return { result: result, time: endTime - startTime }
}

// Algoritma Greedy
let findPlatformGreedy = function (arr, dep, n) {
    // start timer
    startTime = performance.now()

    // Sort arrival and departure arrays
    arr = arr.sort((a, b) => a - b)
    dep = dep.sort((a, b) => a - b)

    // plat_needed indicates number of platforms needed at a time
    let plat_needed = 1
    let result = 1
    let i = 1
    let j = 0

    // Similar to merge in
    // merge sort to process
    while (i < n && j < n) {
        // If next event in sorted
        // order is arrival, increment
        if (arr[i] <= dep[j]) {
            plat_needed++
            i++
        }

        // Else decrement count
        // of platforms needed
        else if (arr[i] > dep[j]) {
            plat_needed--
            j++
        }

        // Update result if needed
        if (plat_needed > result) result = plat_needed
    }

    // end timer
    endTime = performance.now()
    return { result: result, time: endTime - startTime }
}