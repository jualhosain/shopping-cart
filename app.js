let data = [
    { id: 1, items: 'bags', rate: 100, qty: 1, total: 100 },
    { id: 2, items: 'mango', rate: 100, qty: 2, total: 200 },
    { id: 3, items: 'orang', rate: 50, qty: 5, total: 250 },
    { id: 4, items: 'fan', rate: 1200, qty: 3, total: 3600 },
]


let table1 = document.querySelector('.table1 tbody')
let table2 = document.querySelector('.table1 tbody')
let discount = document.querySelector('.discount')
let add = document.querySelector('.add')
let totalDiscount = document.querySelector('.totalDiscount')
let Qty = document.querySelector('.totalQty')
let grandTotal = document.querySelector('.grandTotal')
let totalPrize = document.querySelector('.totalPrize')




let btn = true;
let editcheckId = null;
btn ? mk() : mkEdit();

add.addEventListener('click', (e) => {
    if (btn == true) {
        btn = false
        btn ? mk() : mkEdit();
        e.target.innerText = 'cancel item'
    } else {
        btn = true
        btn ? mk() : mkEdit();
        e.target.innerText = 'add item'

    }

    let saveItems = document.querySelector('.saveItems')
    saveItems.addEventListener('click', (e) => {
        let items = e.target.parentElement.parentElement.children[1].firstChild.value
        let qty = e.target.parentElement.parentElement.children[2].firstChild.value
        let rate = e.target.parentElement.parentElement.children[3].firstChild.value
        if (items == '' || qty == '' || rate == '') {
            alert('Empty Filled Not Allowed ! Please Fillup the empty fill with proper value')
        } else if (qty <= 0 || rate <= 0) {
            alert('zero can\'t masue and Not Allowed  ');
        } else {
            let ourdata = {
                id: data.length,
                items: items,
                rate: rate,
                qty: qty,
                total: rate * qty
            }

            console.log('hello');

            data.push(ourdata)
            btn = true
            btn ? mk() : mkEdit();
            add.innerText = 'add item'
            allCalc()


        }

    })
})




function mk(edit = null) {

    let tr = ''
    for (let i = 0; i < data.length; i++) {
        if (edit == data[i].id) {
            tr += `
            <tr>
                <td>${i + 1}.</td>
                <td><input type='text' value=${data[i].items} /></td>
                <td><input type='text' value=${data[i].qty} /></td>
                <td><input type='text' value=${data[i].rate} /></td>
                <td>${(data[i].total).toFixed(2)}</td>
                <td id=${data[i].id} class='action'>
                    <button class="edit">Cancel</button>
                    <button class="delete">delete</button>
                    <button onclick={editsave(this)} class="save">save</button>
                </td>

            </tr>
            `

        } else {
            tr += `
            <tr>
                <td>${i + 1}.</td>
                <td>${data[i].items}</td>
                <td>${data[i].qty}</td>
                <td>${data[i].rate}</td>
                <td>${(data[i].total).toFixed(2)}</td>
                <td id=${data[i].id} class='action'>
                    <button class="edit">Edit</button>
                    <button class="delete">delete</button>
                </td>

            </tr>
            `

        }
    }

    table1.innerHTML = tr;
    funcdel()
    funcEdit()

}


function mkEdit() {


    let tr = ''
    for (let i = 0; i < data.length; i++) {
        tr += `
        <tr>
                <td>${i + 1}.</td>
                <td>${data[i].items}</td>
                <td>${data[i].qty}</td>
                <td>${data[i].rate}</td>
                <td>${(data[i].total).toFixed(2)}</td>
                <td id=${data[i].id} class='action'>
                    <button class="edit">Edit</button>
                    <button class="delete">delete</button>
                </td>

            </tr>
    `


    }

    tr += `
        <tr>
                <td>${data.length + 1}.</td>
                <td><input type='text' placeholder='items'></td>
                <td><input type='number'  placeholder='qty'></td>
                <td><input type='number'  placeholder='rate'></td>
                <td></td>
                <td class='action'>
                    <button class="saveItems">save</button>
                </td>

            </tr>
    `

    table1.innerHTML = tr
    funcdel()
    funcEdit()

}

// total calculate 

allCalc()

function allCalc() {

    const totalQty = () => {
        let total = 0;
        data.forEach((a, b) => {
            total += a.qty

        })
        return Number(total)
    }

    Qty.innerText = totalQty()


    const total = () => {
        let total = 0;
        data.forEach((a, b) => {
            total += a.total

        })
        return total
    }

    totalPrize.innerText = (total()).toFixed(2)
    grandTotal.innerText = numberWithCommas(Math.round(total()))
    totalDiscount.innerText = 0
    write(Math.round(total()))
    
    
    
    let oldDis = 0
    discount.addEventListener('keyup', (e) => {
        let dis = e.target.value

        if (dis >= 0 && dis <= 100) { 
            let discount = total() * (dis / 100)
            totalDiscount.innerText = (discount).toFixed(2)

            grandTotal.innerText = numberWithCommas(Math.round(total() - discount))
            write(Math.round(total() - discount))
            
            oldDis = e.target.value

        } else {
            alert('Please give a percentage between 0 to 100')
            e.target.value = oldDis
            
        }

    })

}



function ourtotalCall() {
    btn ? mk() : mkEdit();
    allCalc()
}

function funcdel() {
    let del = document.querySelectorAll('.delete')

    // delete part 

    del.forEach((a, b) => {
        a.addEventListener('click', () => {
            let btnId = a.parentElement.id
            let dt = data.filter(aa => {
                return aa.id != btnId
            })

            data = dt;
            ourtotalCall()

        })
    })
}

function funcEdit() {
    let edit = document.querySelectorAll('.edit')

    // edit part 



    edit.forEach((a, b) => {
        a.addEventListener('click', () => {
            if (editcheckId === null) {
                let editId = a.parentElement.id
                editcheckId = a.parentElement.id
                mk(editId)


            } else {
                if (editcheckId == a.parentElement.id) {
                    mk()
                    editcheckId = null
                } else {
                    let editId = a.parentElement.id
                    editcheckId = a.parentElement.id
                    mk(editId)
                }
            }

        })
    })
}


function editsave(a) {
    id = a.parentElement.id
    items = a.parentElement.parentElement.children[1].firstChild.value
    qty = a.parentElement.parentElement.children[2].firstChild.value
    rate = a.parentElement.parentElement.children[3].firstChild.value
    data.forEach(a => {
        if (a.id == id) {
            a.items = items
            a.qty = qty
            a.rate = rate
            a.total = (qty * rate)

            ourtotalCall()
        }
    })



}





function write(a) {    
    if (!isNaN(a)) {
        let inword = document.querySelector('.inword span')
        inword.innerText = toWordsconver(Math.round(a));
    }

}







// copypaste code for thousand separator

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



