describe('Create_Myorder', () => {
  beforeEach(()=>{
    cy.visit('https://www.myorder.ai/auth/login')
    cy.get('input[id="email-input"]').type('phakjira@gmail.com')
    cy.get('input[id="password-input"]').type('P@ssw0rd')
    cy.get('#login-button').click()
    cy.get('.team-name').contains('test team').click()
    // cy.get('.site-context>span').contains('คลังสินค้า').click()
    // cy.get('#export-report-button>div>span').contains('Import excel').click()
    // cy.get('#single-product>p').contains(' สินค้าเดี่ยว ').click()
    // cy.get('.input-upload-area').selectFile("cypress/fixtures/exampleOrder.xlsx",{force:true}) 
    // cy.intercept('POST',"https://mod-om-gateway.myorder.ai/product-import/excel/product").as("apiUploadSingleItems")
    // cy.get('#submit-upload-button').should('be.visible').click()
    // cy.wait("@apiUploadSingleItems").its('response.statusCode').should('eq',200)

    
    // cy.get(".table-product").each(($element)=>{
    //   cy.wrap($element).within(()=>{
    //     cy.get('.ng-star-inserted>.delete').click()
    //     cy.get('.confirm').contains('ยืนยัน').click()
    //   })
  })

  

  
  const name = "Phakjira mahissaya"
  const phoneNumber = "0955555555"
  const phoneNumberFormat ='095-555-5555'
  const address = "118 ซอยลาดพร้าว1"
  const position = "แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230"

  const detailAddress = `${name}\n${phoneNumber}\n${address}\n${position}`


  it('C_02', () => {
    cy.get('a[id="facebook-button"]').contains('FB').click()
    cy.get('#address-detect-input').type(detailAddress)
    cy.wait(1000)
    cy.get('input[id="customer-name-input"]').should("have.value", name)
    cy.get('input[id="tel-input"]').should("have.value",phoneNumberFormat)
    cy.get('textarea[id="address-input"]').should("have.value",address)
    cy.get('#search-address')
        .invoke('val')
        .should('match', /แขวงลาดพร้าว เขตลาดพร้าว จังหวัดกรุงเทพ 10230/)


    enum expectItems {
      ITEM1 =' โซฟา ',
      ITEM2 = ' เสื้อคอเต่า ',
      ITEM3 = ' เสื้อโดยอง version 2 '

    }

    const expectItemsName = [expectItems.ITEM1,expectItems.ITEM2,expectItems.ITEM3]
    const expectItemsAmount = ['1','3','4']

    cy.get('div[id="system-product-add"]').contains('เพิ่มสินค้าในระบบ').click()

    cy.get(':nth-child(1) > .product-box > .front > .product-name-part')  })
// cy.get('app-create-system-product[class = "ng-star-inserted"]').each(($element,index)=>{
    //   const items = expectItemsName[index];
    //   const amount = expectItemsAmount[index]

    //   cy.wrap($element).within(() => {
    //     cy.get('.product-name-part>div[id="product-name"]>div[id="product-name-tooltip"]>p').should('have.text',items).then(($Item)=>{
    //       if($Item.text() === expectItemsName[index]){
    //         cy.get('.div-amount-input').type(amount)
    //       }
          
          
    //     })
    //     })
        
    //     });

    //   cy.get('button[id="select-product-button"]').should('be.visible').click()

  
  })


