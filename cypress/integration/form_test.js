
describe('User-Onboarding',() => {
    beforeEach(() => {
        cy.visit('http://localhost:3002'); 
    })

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const termsBtn = () => cy.get('input[name="Yes"]')
    const submitBtn = () => cy.get('button')


    it('Checking if the text inputted contains the text provided', () => {
        nameInput().should("exist")
        emailInput().should("exist")
        passwordInput().should("exist")
        termsBtn().should("exist")
        submitBtn().should("exist")
        cy.contains("Submit")
    })
    it('Can type in the inputs', () =>{
        nameInput()
            .should("have.value", "")
            .type("Jack")
            .should("have.value", "Jack")

        emailInput()
            .should("have.value", "")
            .type("jack@email.com")
            .should("have.value", "jack@email.com")
        
        passwordInput()
            .should("have.value", "")
            .type("password")
            .should("have.value", "password")
    })
    it('Can check the terms of service box', () => {
        termsBtn().click()
    })
    it('Can submit the form data', () => {
        nameInput().type("Jack")
        emailInput().type("jack@email.com")
        passwordInput().type("password")
        termsBtn().click()
        submitBtn().click()
    })
    it('Can check if any input was left empty'), () => {
        submitBtn.should("be.disabled")
        nameInput.type("Name")
        emailInput.type("email@email.com")
        passwordInput.type("password")
        termsBtn().click()
        submitBtn().should("not.be.disabled")
    }

    
})