const initialCards = [
	{
		id: 1,
		title: 'Футболка UZcotton мужская',
		img: '../assets/images/t-shirt.jpg',
		color: 'Цвет: белый',
		size: 'Размер: 56',
		storage: 'Коледино WB',
		company: 'ООО Вайлдберриз',
		value: 1,
		stock: 3,
		price: 522,
		priceNoDiscount: 1051,
		isChecked: true,
	},
	{
		id: 2,
		title:
			'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
		img: '../assets/images/smartphone.jpg',
		color: 'Цвет: прозрачный',
		storage: 'Коледино WB',
		company: 'OOO Мегапрофстиль',
		value: 200,
		price: 10500,
		priceNoDiscount: 11500,
		isChecked: true,
	},
	{
		id: 3,
		title:
			'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
		img: '../assets/images/book.jpg',
		storage: 'Коледино WB',
		company: 'ООО Вайлдберриз',
		value: 2,
		stock: 2,
		price: 247,
		priceNoDiscount: 475,
		isChecked: true,
	},
]

let arrayPriceNoDiscount = [],
	arrayValueItem = [],
	countCheckbox = 0,
	totalSumText = 0

countCheckbox >= 0
	? labelCart.forEach(el => (el.style.display = 'grid'))
	: labelCart.forEach(el => (el.style.display = 'none'))

const totalSum = (cardPrice, cardValue) => {
	let sum = 0

	arrayPriceNoDiscount.push(cardPrice)
	arrayValueItem.push(cardValue)
	if (arrayPriceNoDiscount.length == 6) {
		for (let i = 0; i < arrayPriceNoDiscount.length; i++) {
			if (i % 2 === 0) {
				sum += arrayPriceNoDiscount[i] * arrayValueItem[i]
			}
		}
		arrayPriceNoDiscount = []
		arrayValueItem = []
	}
	totalSum1.textContent = prettify(sum)
}

const amountOfPrice = (...props) => {
	const [cardValue, cardPrice, cardPriceNoDiscount, item] = props
	cardPrice.forEach(price => {
		price.textContent = prettify(item.price * cardValue.value)
	})
	cardPriceNoDiscount.forEach(price => {
		price.textContent = prettify(item.priceNoDiscount * cardValue.value)
	})
}

const manageBtnValue = (...props) => {
	const [
		cardBtnMinus,
		cardBtnPlus,
		cardValue,
		cardStock,
		cardPrice,
		cardPriceNoDiscount,
		item,
		cardCheckbox,
	] = props

	if (cardValue.value <= 1) {
		cardBtnMinus.style.opacity = 0.2
	} else if (
		cardValue.value == cardStock.textContent &&
		cardStock.textContent
	) {
		cardBtnPlus.style.opacity = 0.2
		cardBtnMinus.style.opacity = 1
	}

	cardBtnMinus.addEventListener('click', () => {
		if (cardValue.value > 1) {
			totalSumText = unprettify(totalSum1.textContent) - item.price
			totalSum1.textContent = prettify(totalSumText)
		}
		cardValue.value--
		if (cardValue.value <= 1) {
			cardValue.value = 1
			cardBtnMinus.style.opacity = 0.2
			cardBtnPlus.style.opacity = 1
		} else {
			cardBtnPlus.style.opacity = 1
			cardBtnMinus.style.opacity = 1
		}
		amountOfPrice(cardValue, cardPrice, cardPriceNoDiscount, item)
	})

	cardBtnPlus.addEventListener('click', () => {
		if (cardValue.value < cardStock.textContent || !cardStock.textContent) {
			totalSumText = unprettify(totalSum1.textContent) + item.price
			totalSum1.textContent = prettify(totalSumText)
		}
		cardValue.value++
		if (cardValue.value > cardStock.textContent && cardStock.textContent) {
			cardValue.value = parseInt(cardStock.textContent)
		}
		if (cardValue.value == cardStock.textContent && cardStock.textContent) {
			cardBtnMinus.style.opacity = 1
			cardBtnPlus.style.opacity = 0.2
		} else {
			cardBtnPlus.style.opacity = 1
			cardBtnMinus.style.opacity = 1
		}
		amountOfPrice(cardValue, cardPrice, cardPriceNoDiscount, item)
	})
}

// Создаем переменную и находим шаблон карточки и получаем контент
const cardTemplate = document.querySelector('.card-template').content

// Место куда мы будем засовывать наши карточки
const cardsList = document.querySelectorAll('.list-items__main.content')
// Функция добавления карточки
const createCards = item => {
	const cloneCards = cardTemplate.cloneNode(true)
	const cardTitle = cloneCards.querySelector('.info__title'),
		cardImage = cloneCards.querySelector('.item__img'),
		cardPrice = cloneCards.querySelectorAll('.price'),
		cardPriceNoDiscount = cloneCards.querySelectorAll('.price__no-discount'),
		cardColor = cloneCards.querySelector('.params-color'),
		cardSize = cloneCards.querySelector('.params-size'),
		cardCompany = cloneCards.querySelectorAll('.info__extra.company'),
		cardValue = cloneCards.querySelector('.input-quantity'),
		cardCheckbox = cloneCards.querySelector('.checkbox'),
		cardLabelCheckbox = cloneCards.querySelector('.checkbox-label'),
		cardBtnMinus = cloneCards.querySelector('.btn-minus'),
		cardBtnPlus = cloneCards.querySelector('.btn-plus'),
		cardStock = cloneCards.querySelector('.stock-item'),
		cardStockWarning = cloneCards.querySelector('.form__warning')

	cardTitle.textContent = item.title
	cardImage.src = item.img
	cardPriceNoDiscount.forEach(
		price => (price.textContent = item.priceNoDiscount)
	)
	cardColor.textContent = item.color
	cardSize.textContent = item.size
	cardCompany[0].textContent = item.company
	cardValue.value = item.value
	cardValue.id = item.id
	cardCheckbox.id = item.id
	cardCheckbox.checked = item.isChecked
	cardLabelCheckbox.htmlFor = item.id
	cardStock.textContent = item.stock

	if (!item.stock) {
		cardStockWarning.style.display = 'none'
	}

	cardPrice.forEach(price => {
		totalSum(parseInt((price.textContent = item.price)), cardValue.value)
	})

	manageBtnValue(
		cardBtnMinus,
		cardBtnPlus,
		cardValue,
		cardStock,
		cardPrice,
		cardPriceNoDiscount,
		item,
		cardCheckbox
	)

	if (cardCheckbox.checked) {
		countCheckbox++
	}
	labelCart.forEach(el => (el.innerText = countCheckbox))

	cardCheckbox.addEventListener('input', () => {
		cardCheckbox.checked ? countCheckbox++ : countCheckbox--
		labelCart.forEach(el => (el.innerText = countCheckbox))
		countCheckbox > 0
			? labelCart.forEach(el => (el.style.display = 'grid'))
			: labelCart.forEach(el => (el.style.display = 'none'))
	})

	amountOfPrice(cardValue, cardPrice, cardPriceNoDiscount, item)

	return cloneCards
}

// Добавление массива и новых карточек на страницу
const addCadrs = item => {
	cardsList[0].append(createCards(item))
}
initialCards.forEach(item => {
	addCadrs(item)
})
