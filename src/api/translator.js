export const deleteCustomerMessage = (lang) => {
    return languageSwitch(lang, "This will delete customer, do you want to proceed?", "यह ग्राहक को हटा देगा, क्या आप आगे बढ़ना चाहते हैं?")

}

export const addNewCustomerMessage = (lang) => {
    return languageSwitch(lang, "Add new Customer", "नया ग्राहक जोड़ें")
}

export const appHeader = (lang) => {
    return languageSwitch(lang, "Sharma Kirana Store", "शर्मा किराना स्टोर")
}

export const newCustomer = (lang) => {
    return languageSwitch(lang, "New Customer", "नए ग्राहक")

}

export const submitButton = (lang) => {
    return languageSwitch(lang, "Submit", "ठीक है")

}

export const deleteCustomer = (lang) => {
    return languageSwitch(lang, "Delete Customer", "ग्राहक हटाएं")

}

export const editCustomer = (lang) => {
    return languageSwitch(lang, "Update Customer", "ग्राहक अपडेट करें")

}

export const debitAmount = (lang) => {
    return languageSwitch(lang, "Debit Amount", "उधार")

}

export const depositAmount = (lang) => {
    return languageSwitch(lang, "Deposit Amount", "जमा")

}

export const tableHeaderName = (lang) => {
    return languageSwitch(lang, "Customer Name", "ग्राहक का नाम")
}
export const tableHeaderAddress = (lang) => {
    return languageSwitch(lang, "Customer Address", "ग्राहक का पता")
}
export const tableHeaderPhone = (lang) => {
    return languageSwitch(lang, "Customer Mobile Number", "ग्राहक का मोबाइल नंबर")
}

const languageSwitch = (lang, englishInput, hindiInput) => {
    if (lang === "hindi") {
        return hindiInput
    }
    return englishInput
}