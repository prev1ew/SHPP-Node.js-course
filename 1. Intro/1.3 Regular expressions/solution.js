const regExpEmailValidation = /^([a-zA-Z]{1})(([\a-zA-Z-\.+]){1,20})@+[\a-zA-Z-!\.\$%&’*+/=?^_]{1,16}\.[\w-]{1,6}$/
const regExpPhoneValidation = /^(\s|-)*((\+(\s|-)*3(\s|-)*8)?)(\s|-|\()*([\d](\s|-)*){3}(\s|-|\))*((\s|-)*[\d]){7}$/
const regExpPasswordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]{8,}$/

const Validator = () => {
    return {
        validateEmail: function (emailToValidate) {
            return regExpEmailValidation.test(emailToValidate)
        },
        validatePhone: function (phoneToValidate) {
            if (phoneToValidate.length > 25) {
                return false;
            }
            return regExpPhoneValidation.test(phoneToValidate)
        },
        validatePassword: function (passwordToValidate) {
            return regExpPasswordValidator.test(passwordToValidate)
        },
    }
}

const val1 = Validator();

console.log(val1.validateEmail("first.part@se=cond%part.r") === true)
console.log(val1.validateEmail("fi@secondpart.end") === true)
console.log(val1.validateEmail("first-part@.se=cond%p.art.end") === true)
console.log(val1.validateEmail("first-part@.se=cond@part.end") === false)
console.log(val1.validateEmail("f@secondart.end,") === false)
console.log(val1.validateEmail("-firstpart@.se=cond%.enddeded") === false)
console.log(val1.validateEmail("firs_tpart@.se.en") === false)
console.log(val1.validateEmail("firstpart@.se.enddeded") === false)

console.log(val1.validatePhone("+38 (099) 567 8901") === true)
console.log(val1.validatePhone("+38 099 5 6 7 8 9  01") === true)
console.log(val1.validatePhone("(09-9) 567-890-1") === true)
console.log(val1.validatePhone("--  (099) 567 890-1") === true)
console.log(val1.validatePhone("+38 (099) 567 8901 0") === false)
console.log(val1.validatePhone("+38 099 a0000000") === false)
console.log(val1.validatePhone("+38 (0989) 567 8901") === false)
console.log(val1.validatePhone("+48 (0989) 567 8901") === false)

console.log(val1.validatePassword("C00l_Pass") === true)
console.log(val1.validatePassword("SupperPas1") === true)
console.log(val1.validatePassword("Cool_pass") === false)
console.log(val1.validatePassword("C00l") === false)