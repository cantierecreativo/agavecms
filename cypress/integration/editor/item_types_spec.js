describe('Items', () => {
  let new_item_type_id = ''

  beforeEach(() => {
    cy.
      post(
        '/item-types',
        {
          type: 'item_type',
          attributes: {
            name: 'Blog post',
            api_key: 'post',
            singleton: false,
            sortable: false,
            tree: true,
            ordering_direction: null
          },
          relationships: {
            ordering_field: {
              data: null
            }
          }
        }
      ).
      then(response => {
        new_item_type_id = response.body.data.id

        cy.post(
          `/item-types/${new_item_type_id}/fields`,
          {
            type: 'field',
            attributes: {
              label: 'Editor',
              api_key: 'editor',
              hint: '',
              field_type: 'text',
              appeareance: {
                type: 'markdown'
              },
              validators: {},
              localized: false,
              position: 1
            }
          }
        )
      })
  })

  describe('When the user is logged in', () => {
    beforeEach(() => {
      cy.logIn()
    })

    context('When they create a new item', () => {
      it('saves the item', () => {
        cy.visit(`/editor/item_types/${new_item_type_id}/items/new`)
        cy.get('.icon--add').click()
        cy.get('.CodeMirror textarea')
          .type('Test', { force: true })
        cy.get('.button--huge').click()
        cy.visit(`/editor/item_types/${new_item_type_id}/items/new`)

        cy.contains('Test').should('be.visible')
      })
    })
  })
})
