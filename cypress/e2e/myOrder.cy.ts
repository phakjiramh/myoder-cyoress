describe("Create_Myorder", () => {

  beforeEach(() => {
    cy.visit("https://www.myorder.ai/auth/login");
    cy.logIn()
    cy.uploadItems()

  });

  afterEach(() => {
    cy.deleteAllOrders()
    cy.deleteAllItems()

  })

  

  it("C_02", () => {
    cy.get('span[class="child-name"]').contains('ช่องทางการขายอื่น').click()
    cy.wait(4000)
    cy.inputAddressParser()
    cy.itemsInSystem()
    cy.get('.confirm-button>span').should('have.text', ' สร้างออเดอร์ ').click()
    cy.get('.display>div[class="message"]').contains('บันทึกสำเร็จ')
    cy.validateOrder


  });






})


