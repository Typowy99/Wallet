const showIncomeBtn = document.querySelector('.nav__right-transaction')
const showExpenseBtn = document.querySelector('.nav__right-expense')
const deleteAllBtn = document.querySelector('.nav__right-transaction-delete')
const leftPanel = document.querySelector('.panel-left')
const rightPanel = document.querySelector('.panel-right')
const btnCancel = document.querySelector('.cancel')
const btnCancelRight = document.querySelector('.cancel-right')
const btnSave = document.querySelector('.save')
const btnSaveRight = document.querySelector('.save-right')
const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')
const nameInputSecond = document.querySelector('#name-second')
const amountInputSecond = document.querySelector('#amount-second')
const categorySelectSecond = document.querySelector('#category-second')
const btnDelete = document.querySelector('.delete')
const availableMoney = document.querySelector('.money')

let ID = 0
let moneySum = 0

const showIncome = () => {
	leftPanel.classList.toggle('panel-active')
}
const showExpense = () => {
	rightPanel.classList.toggle('panel-active')
}
const createIncome = () => {
	const newIncome = document.createElement('div')
	newIncome.classList.add('transaction')
	newIncome.setAttribute('id', ID)
	newIncome.innerHTML = `
	<p class="transaction-name"><i class="icon fas fa-cart-arrow-down"></i>${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}<button class="delete" onclick="deleteTansaction(${ID})"><i
				class="fas fa-times"></i></button></p>`
	showIncome()
	incomeArea.appendChild(newIncome)
	moneySum += parseFloat(amountInput.value)
	availableMoney.textContent = ` ${moneySum}zł`
	clearIncome()
	changeColor()
	ID++
}
const createExpense = () => {
	const newExpense = document.createElement('div')
	newExpense.classList.add('transaction')
	newExpense.setAttribute('id', ID)
	newExpense.innerHTML = `
	<p class="transaction-name"><i class="icon fas fa-cart-arrow-down"></i>${nameInputSecond.value}</p>
	<p class="transaction-amount">-${amountInputSecond.value}zł<button class="delete" onclick="deleteTansaction(${ID})"><i
				class="fas fa-times"></i></button></p>`
	showExpense()
	expensesArea.appendChild(newExpense)
	moneySum -= parseFloat(amountInputSecond.value)
	availableMoney.textContent = ` ${moneySum}zł`
	clearExpense()
	changeColor()
	ID++
}
const checkCreateIncome = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createIncome()
	} else {
		alert('Wypełnij wszystkie pola!')
	}
}
const checkCreateExpense = () => {
	if (nameInputSecond.value !== '' && amountInputSecond.value !== '' && categorySelectSecond.value !== 'none') {
		createExpense()
	} else {
		alert('Wypełnij wszystkie pola!')
	}
}
const clearIncome = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.value = 'none'
}
const clearExpense = () => {
	nameInputSecond.value = ''
	amountInputSecond.value = ''
	categorySelectSecond.value = 'none'
}
const deleteTansaction = id => {
	const incomeElement = document.getElementById(id)
	const item = incomeElement.querySelector('.transaction-amount')
	moneySum -= parseFloat(item.textContent)
	availableMoney.textContent = ` ${moneySum}zł`
	incomeElement.remove()
	changeColor()
	// incomeElement.remove()
}
const deleteAll = () => {
	incomeArea.innerHTML = '<p class="title">Przychód:</p>'
	expensesArea.innerHTML = '<p class="title">Wydatki:</p>'
	moneySum = 0
	availableMoney.textContent = ` ${moneySum}zł`
	changeColor()
}
const changeColor = () => {
	if (moneySum < 0) {
		availableMoney.style.color = 'red'
	} else if (moneySum > 0) {
		availableMoney.style.color = 'green'
	} else if (moneySum === 0) {
		availableMoney.style.color = 'rgb(58, 60, 59)'
	}
}
showIncomeBtn.addEventListener('click', showIncome)
showExpenseBtn.addEventListener('click', showExpense)
btnCancel.addEventListener('click', showIncome)
btnCancelRight.addEventListener('click', showExpense)
btnSave.addEventListener('click', checkCreateIncome)
btnSaveRight.addEventListener('click', checkCreateExpense)
deleteAllBtn.addEventListener('click', deleteAll)
