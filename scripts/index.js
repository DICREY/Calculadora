document.addEventListener("DOMContentLoaded", () => {
    // Dynamic labels
    const screenLabel = document.getElementById("screen")
    const screenLabelSecond = document.getElementById("screen-second")
    
    // Btn labels
    const div = document.getElementById("div")
    const porcentaje = document.getElementById("porcentaje")
    const deleteAll = document.getElementById("delete-all")
    const nine = document.getElementById("nine")
    const eight = document.getElementById("eight")
    const seven = document.getElementById("seven")
    const mult = document.getElementById("mult")
    const six = document.getElementById("six")
    const five = document.getElementById("five")
    const four = document.getElementById("four")
    const rest = document.getElementById("rest")
    const three = document.getElementById("three")
    const two = document.getElementById("two")
    const one = document.getElementById("one")
    const cont = document.getElementById("sum")
    const threeCeros = document.getElementById("threeCeros")
    const twoCeros = document.getElementById("twoCeros")
    const cero = document.getElementById("cero")
    const btnDelete = document.getElementById("btnDelete")
    const igual = document.getElementById("igual")

    // Vars
    let result
    
    // Lists
    const btns = [
        {
            btn: div,
            value: "/"
        },
        {
            btn: porcentaje,
            value: "%"
        },
        {
            btn: deleteAll,
        },
        {
            btn: nine,
            value: "9"
        },
        {
            btn: eight,
            value:"8"
        },
        {
            btn: seven,
            value:"7"
        },
        {
            btn: mult,
            value: "*"
        },
        {
            btn: six,
            value:"6"
        },
        {
            btn: five,
            value:"5"
        },
        {
            btn: four,
            value:"4"
        },
        {
            btn: rest,
            value:"-"
        },
        {
            btn: three,
            value:"3"
        },
        {
            btn: two,
            value:"2"
        },
        {
            btn: one,
            value:"1"
        },
        {
            btn: cont,
            value:"+"
        },
        {
            btn: threeCeros,
            value: "000"
        },
        {
            btn: twoCeros,
            value:"00"
        },
        {
            btn: cero,
            value:"0"
        }
    ]
    
    // Events
    document.addEventListener("keypress",() => calc(true))
    btnDelete.addEventListener("click",deleteOne)
    igual.addEventListener("click",() => calc(false))
    btns.forEach(i => {
        i.btn.addEventListener("click",() => {
            i.btn === deleteAll? screenLabel.value = ""
            :screenLabel.value += i.value
        })
    })

    // functions
    function deleteOne() {
        let content = screenLabel.value
        let contentList = []

        for (let i of content) contentList.push(i)
        contentList.pop()
        screenLabel.value = String(contentList).replaceAll(",","")
    }

    function calc(screenLS) {
        let total = screenLabel.value
        let str = ""
        let cont = []
        let resultList

        for (let i of total) {
            if (i === "+" || i === "*" || i === "-" || i === "/" || i === "%") {
                cont.push(Number(str))
                cont.push(i)
                str = ""
            } else str += i
        }
        cont.push(Number(str))
        cont.forEach(i => {
            switch (i) {
                case "+":
                    let sumIndex = cont.findIndex(i => i === "+")
                    if (sumIndex === 1) {
                        resultList = cont[(sumIndex - 1)] + cont[(sumIndex + 1)]
                    } else resultList += cont[(sumIndex + 1)]
                    break
                case "-":
                    let resIndex = cont.findIndex(i => i === "-")
                    if (resIndex === 1) {
                        resultList = cont[(resIndex - 1)] - cont[(resIndex + 1)]
                    } else resultList -= cont[(resIndex + 1)]
                    break
                case "/":
                    let divIndex = cont.findIndex(i => i === "/")
                    if (divIndex === 1) {
                        resultList = cont[(divIndex - 1)] / cont[(divIndex + 1)]
                    } else resultList /= cont[(divIndex + 1)]
                    break
                case "*":
                    let multIndex = cont.findIndex(i => i === "*")
                    if (multIndex === 1) {
                        resultList = (cont[(multIndex - 1)] * cont[(multIndex + 1)])
                    } else resultList *= cont[(multIndex + 1)]
                    break
                case "%":
                    let porIndex = cont.findIndex(i => i === "%")
                    resultList = ((cont[(porIndex - 1)] * cont[(porIndex + 1)]) / 100)
                    break
                }
            })
        if (screenLS) {
            resultList? screenLabelSecond.innerText = resultList:
            screenLabelSecond.innerText = "0"
        } else resultList? screenLabel.value = resultList:
            screenLabel.value = "0"
    }

    function useKeyboard() {
        document.addEventListener("keydown",(e)=> {
            calc(true)
            if (screenLabelSecond.innerText === undefined) screenLabelSecond.innerText = "0"

            btns.forEach(i => {
                if (e.key === i.value) screenLabel.value += i.value
            })
            if (e.key === "Backspace") deleteOne()
            if (e.key === "Enter") calc(false)
        })
    }

    // Call functions
    useKeyboard()
})