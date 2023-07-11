const log = console.log

class C {
    #privateInstanceField = "TEST";
    constructor() {
        this.publicInstanceField = 'Публичное поле экземпляра'
        this.#privateInstanceField = 'Приватное поле экземпляра'
    }

    publicInstanceMethod() {
        log('Публичный метод экземпляра')
    }

    // получаем значение приватного поля экземпляра
    getPrivateInstanceField() {
        log(this.#privateInstanceField)
    }

    static publicClassMethod() {
        log('Публичный метод класса')
    }
}

const c = new C()

console.log(c.publicInstanceField)
c.getPrivateInstanceField()