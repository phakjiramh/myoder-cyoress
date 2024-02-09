declare namespace Cypress {
    interface Chainable {
      uploadItems(): Chainable<null>;
      deleteAllOrders() : Chainable<null>
      deleteAllItems(): Chainable<null>
      inputAddressParser() : Chainable <null>
      itemsInSystem(): Chainable <null>
      validateOrder(): Chainable<null>

    }
  }

  Cypress.Commands.add('uploadItems',()=>{
    
        cy.get('.site-context>span').contains('คลังสินค้า').click()
        cy.get('#export-report-button>div>span').contains('Import excel').click()
        cy.get('#single-product>p').contains(' สินค้าเดี่ยว ').click()
        cy.get('.input-upload-area').selectFile("cypress/fixtures/exampleOrder.xlsx", { force: true })
        cy.intercept('POST', "https://mod-om-gateway.myorder.ai/product-import/excel/product").as("apiUploadSingleItems")
        cy.get('#submit-upload-button').should('be.visible').click()
        cy.wait("@apiUploadSingleItems").its('response.statusCode').should('eq', 200)
      
  })

  Cypress.Commands.add('deleteAllOrders',()=>{
    
      cy.get('.select-all').check()
      cy.get('button[id="remove-order-btn"]').click()
      cy.get('.modal-body>div>div>input[placeholder="กรุณาพิมพ์คำว่า ลบ เพื่อยืนยัน"]').type('ลบ')
      cy.wait(4000)
      cy.get('button[id="confirm-submit-button"]').click()
      cy.get('.display>.message>p').contains('ลบสำเร็จ 1 รายการ')
    
  })

  Cypress.Commands.add('deleteAllItems',()=>{
   
      const allItemSelector = "tr.ng-star-inserted"

      cy.get('.site-context>span').contains('คลังสินค้า').click()
      cy.get(allItemSelector).each(() => {
        cy.get(allItemSelector).first().within(() => {
          cy.get('.delete>p').contains('ลบ').click()
        })

        cy.get('#confirmed-delete-product-button').click()
      })

      cy.get(allItemSelector).should('not.exist')
    
  })


  const customerName = "Phakjira mahissaya";
  const phoneNumber = "0955555555";
  const phoneNumberFormat = "095-555-5555";
  const address = "118 ซอยลาดพร้าว1";
  const position = "แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230";

  const detailAddress = `${customerName}\n${phoneNumber}\n${address}\n${position}`;

  Cypress.Commands.add('inputAddressParser',()=>{
    cy.get('a[id="facebook-button"]').contains("FB").click();
    cy.get("#address-detect-input").type(detailAddress);
    cy.wait(1000);
    cy.get('input[id="customer-name-input"]').should("have.value", customerName);
    cy.get('input[id="tel-input"]').should("have.value", phoneNumberFormat);
    cy.get('textarea[id="address-input"]').should("have.value", address);
    cy.get("#search-address")
      .invoke("val")
      .should("match", /แขวงลาดพร้าว เขตลาดพร้าว จังหวัดกรุงเทพ 10230/);
  })


  Cypress.Commands.add('itemsInSystem',()=>{
    
    const expectItems = [
      {
        expectProductId: "#sofa",
        amount: "1",
      },
      {
        expectProductId: "#ntc01",
        amount: "3",
      },
      {
        expectProductId: "#ntc03",
        amount: "4",
      },
    ];

    cy.get('div[id="system-product-add"]')
      .contains("เพิ่มสินค้าในระบบ")
      .click();



    cy.get('app-create-system-product[class = "ng-star-inserted"]').each(
      ($element) => {
        cy.wrap($element).within(() => {
          cy.get(".ssid")
            .invoke("text")
            .then((elementProductId) => {
              // @ts-ignore
              const isFoundExpectItem = expectItems.find((item) => {
                return item.expectProductId === elementProductId;
              });
              if (isFoundExpectItem) {
                cy.get(".amount-input").type(isFoundExpectItem.amount, {
                  force: true,
                });
              }
            });
        });
      }
    );
  })
  cy.get(".page-footer > .bottom-stat > .summary").contains('1,592 บาท');
    cy.get('button[id="select-product-button"]').contains('เลือกสินค้า').click()
    cy.get('input[id="amount-input"]').should('have.value', '1592');



  Cypress.Commands.add('validateOrder',()=>{

    const patternToCheckProduct = /^(?=.*เสื้อโดยอง version 2\(4\))(?=.*โซฟา\(1\))(?=.*เสื้อโดยอง\(3\)).*$/  // Regex ในเช็คชื่อสินค้า

    cy.get('[id="table-name-label-0"]').contains(customerName)
    cy.get('[id="table-tel-label-0"]').contains(phoneNumberFormat)
    cy.get('[id="table-product-label-0"]').invoke("text").should("match", patternToCheckProduct)
  })