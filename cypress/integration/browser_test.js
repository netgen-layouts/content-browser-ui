/// <reference types="Cypress" />
/* global Cypress, cy */

describe('Multiple browse test', function() {
  Cypress.Commands.add('openContentBrowser', (nr) => {
    cy.get('.js-multiple-browse .js-trigger').click();
    cy.get('[class^="Browser_browser_"]').should('be.visible');
  });

  Cypress.Commands.add('checkSelectedItemsLength', (nr) => {
    cy.window().its('store').invoke('getState').its('app').its('selectedItems').should('have.length', nr);
  });

  Cypress.Commands.add('checkBreadcrumbsAndTableForText', (text) => {
    cy.get('ul[class^="Breadcrumbs_breadcrumbs_"]').contains(text);
    cy.get('table[class^="ItemsTable_table_"] thead').contains(text);
  });

  describe('Open index page', () => {
    it('Loads index page', () => {
      cy.visit('/');
      cy.get('.js-multiple-browse').should('be.visible');
    });
    describe('Open Browser', () => {
      it('open content browser on button click', () => {
        cy.openContentBrowser();
      });
      it('has no selected items in store on load', () => {
        cy.checkSelectedItemsLength(0);
      });
    });
    describe('Test loaders', () => {
      it('shows loader while config loading', () => {
        cy.window().its('store').invoke('dispatch', { type: 'CONFIG_LOADED', isLoaded: false });
        cy.get('[class^="Browser_loading_"]').should('be.visible');
        cy.window().its('store').invoke('dispatch', { type: 'CONFIG_LOADED', isLoaded: true });
        cy.get('[class^="Browser_loading_"]').should('not.be.visible');
      });
      it('shows tree loader while loading', () => {
        cy.window().its('store').invoke('dispatch', { type: 'START_TREE_LOAD' });
        cy.get('[class^="Tree_wrapper_"]').find('[class^="Loader_loader_"]').should('be.visible');
        cy.window().its('store').invoke('dispatch', { type: 'STOP_TREE_LOAD' });
        cy.get('[class^="Tree_wrapper_"]').find('[class^="Loader_loader_"]').should('not.be.visible');
      });
      it('shows items loader while loading', () => {
        cy.window().its('store').invoke('dispatch', { type: 'START_LOCATION_LOAD' });
        cy.get('[class^="Items_items_"]').find('[class^="Loader_loader_"]').should('be.visible');
        cy.window().its('store').invoke('dispatch', { type: 'STOP_LOCATION_LOAD' });
        cy.get('[class^="Items_items_"]').find('[class^="Loader_loader_"]').should('not.be.visible');
      });
    })
    describe('Test content tree', () => {
      it('changes section in select dropdown', () => {
        cy.get('[class^="Browser_treePanel_"]').find('select').as('sectionSelect').children().its('length').should('be.greaterThan', 1);
        cy.get('@sectionSelect').children().eq(1).then((el) => {
          cy.get('@sectionSelect').select(el.val());
          cy.wrap(el).invoke('text').then((text) => {
            cy.checkBreadcrumbsAndTableForText(text);
          });
        });
        cy.get('@sectionSelect').children().eq(0).then((el) => {
          cy.get('@sectionSelect').select(el.val());
          cy.wrap(el).invoke('text').then((text) => {
            cy.checkBreadcrumbsAndTableForText(text);
          });
        });
      });
      it('opens second level in tree item', () => {
        cy.get('[class^="Tree_tree_"]').as('tree');
        cy.get('@tree').find('[class*="Tree_hasItems_"]').as('toggle').click();
        cy.get('@toggle').closest('[class^="Tree_item_"]').as('item');
        cy.get('@item').find('[class^="Tree_tree_"]').should('be.visible').children().its('length').should('be.greaterThan', 1);
        cy.get('@toggle').click();
        cy.get('@item').find('[class^="Tree_tree_"]').should('not.be.visible');
      });
      it('clicks item in content tree', () => {
        cy.get('[class^="Tree_tree_"]').as('tree');
        cy.get('@tree').children().eq(0).as('firstItem').find('button').click();
        cy.get('@firstItem').invoke('text').then(cy.checkBreadcrumbsAndTableForText);
        cy.get('@tree').children().eq(2).as('secondItem').find('button').click();
        cy.get('@secondItem').invoke('text').then(cy.checkBreadcrumbsAndTableForText);
      });
    });
    describe('Test breadcrumbs', () => {
      it('tests three levels of content', () => {
        cy.get('ul[class^="Breadcrumbs_breadcrumbs_"]').as('breadcrumbs').children().eq(0).click();
        cy.get('@breadcrumbs').children().should('have.length', 1);
        cy.get('table[class^="ItemsTable_table_"] tbody').as('tablebody').children().eq(2).children().eq(0).find('button').click();
        cy.get('@breadcrumbs').children().should('have.length', 2);
        cy.get('@tablebody').children().eq(0).children().eq(0).find('button').click();
        cy.get('@breadcrumbs').children().should('have.length', 3);
        cy.get('@breadcrumbs').children().eq(2).find('button').should('not.exist');
        cy.get('@breadcrumbs').children().eq(0).find('button').click();
        cy.get('@breadcrumbs').children().eq(0).invoke('text').then((text) => {
          cy.get('table[class^="ItemsTable_table_"] thead').contains(text);
        });
        cy.get('@breadcrumbs').children().should('have.length', 1);
        cy.get('@breadcrumbs').children().eq(0).find('button').should('not.exist');
      });
    });
    describe('Test pagination', () => {
      it('changes table items limit', () => {
        cy.get('[class^="Pager_pager"]').find('select').as('limiter').select('25');
        cy.window().its('store').invoke('getState').its('app').its('itemsLimit').should('eq', '25');
        cy.get('table[class^="ItemsTable_table_"] tbody').as('tablebody').children().should('have.length.greaterThan', 10);
        cy.get('@limiter').select('5');
        cy.window().its('store').invoke('getState').its('app').its('itemsLimit').should('eq', '5');
        cy.get('@tablebody').children().should('have.length', 5);
      });
      it('tests pagination', () => {
        cy.get('[class^="Pager_pager"]').find('[class^="Pager_pagination"]').as('pagination').children().should('have.length.greaterThan', 3);
        cy.window().its('store').invoke('getState').its('items').its('currentPage').as('statePage').should('eq', 1);
        cy.get('@pagination').children().first().find('button').should('be.disabled');
        cy.get('@pagination').children().last().find('button').should('not.be.disabled');
        cy.get('@pagination').children().last().click();
        cy.window().its('store').invoke('getState').its('items').its('currentPage').as('statePage').should('eq', 2);
        cy.get('@pagination').children().first().find('button').should('not.be.disabled');
        cy.get('@pagination').children().last().prev().click();
        cy.get('@pagination').children().first().find('button').should('not.be.disabled');
        cy.get('@pagination').children().last().find('button').should('be.disabled');
        cy.get('@pagination').children().first().click();
        cy.get('@pagination').children().first().find('button').should('not.be.disabled');
        cy.get('@pagination').children().last().find('button').should('not.be.disabled');
      });
    });
    describe('Test table options', () => {
      it('opens table options dropdown and checks if it\'s visible', () => {
        cy.get('[class^="Items_header_"]').find('[class^="Dropdown_dropdown_"]').as('dropdown').find('[class^="Dropdown_toggle_"]').as('toggle').click();
        cy.get('@dropdown').find('[class^="Dropdown_menu_"]').as('menu').should('be.visible');
      });
      it('checks if selected table columns are visible', () => {
        cy.get('table[class^="ItemsTable_table_"] thead').children().eq(0).as('tableHead');
        cy.get('[class^="Items_header_"]').find('[class^="Dropdown_menu_"]').find('input[type="checkbox"]').each(($checkbox) => {
          cy.wrap($checkbox).parent().find('label').invoke('text').then((text) => {
            if ($checkbox[0].checked) {
              cy.get('@tableHead').should('contain', text);
            } else {
              cy.get('@tableHead').should('not.contain', text);
            }
          });
        });
      });
      it('selects first not checked table column and checks if it\'s visible', () => {
        cy.get('[class^="Items_header_"]').find('[class^="Dropdown_menu_"]').find('input[type="checkbox"]:not(:checked)').first().parent().find('label').then($label => {
          cy.wrap($label).click().invoke('text').then((text) => {
            cy.get('table[class^="ItemsTable_table_"] thead').children().eq(0).should('contain', text);
          });
        });
      });
      it('deselects last checked table column and checks if it\'s not visible', () => {
        cy.get('[class^="Items_header_"]').find('[class^="Dropdown_menu_"]').find('input[type="checkbox"]:checked').last().parent().find('label').then($label => {
          cy.wrap($label).click().invoke('text').then((text) => {
            cy.get('table[class^="ItemsTable_table_"] thead').children().eq(0).should('not.contain', text);
          });
        });
      });
      it('closes table options dropdown and checks if it\'s not visible', () => {
        cy.get('[class^="Items_header_"]').find('[class^="Dropdown_dropdown_"]').as('dropdown').find('[class^="Dropdown_toggle_"]').as('toggle').click();
        cy.get('@dropdown').find('[class^="Dropdown_menu_"]').as('menu').should('not.be.visible');
      });
    });
    describe('Test preview panel', () => {
      it('opens preview on toggle and checks if it\'s visible', () => {
        cy.window().its('store').invoke('dispatch', { type: 'TOGGLE_PREVIEW', toggle: false });
        cy.get('#togglePreview').parent().find('label').click();
        cy.get('[class^="Preview_preview_"]').should('be.visible');
        cy.window().its('store').invoke('getState').its('app').its('showPreview').should('eq', true);
      });
      it('shows preview loader while preview is loading', () => {
        cy.window().its('store').invoke('dispatch', { type: 'START_PREVIEW_LOAD' });
        cy.get('[class^="Preview_preview_"]').find('[class^="Loader_loader_"]').should('be.visible');
        cy.window().its('store').invoke('dispatch', { type: 'STOP_PREVIEW_LOAD' });
        cy.get('[class^="Preview_preview_"]').find('[class^="Loader_loader_"]').should('not.be.visible');
      });
      it('checks if preview shows clicked item', () => {
        cy.get('table[class^="ItemsTable_table_"] thead').children().eq(1).children().eq(0).then(($cell) => {
          cy.wrap($cell).click().invoke('text').then((text) => {
            cy.get('[class^="Preview_preview_"]').should('contain', text);
          });
        });
        cy.get('table[class^="ItemsTable_table_"] tbody').children().eq(0).children().eq(0).then(($cell) => {
          cy.wrap($cell).click().invoke('text').then((text) => {
            cy.get('[class^="Preview_preview_"]').should('contain', text);
          });
        });
      });
      it('closes preview on toggle and checks if it\'s invisible', () => {
        cy.get('#togglePreview').parent().find('label').click();
        cy.get('#togglePreview').should('not.be.checked');
        cy.get('[class^="Preview_preview_"]').should('not.be.visible');
        cy.window().its('store').invoke('getState').its('app').its('showPreview').should('eq', false);
      });
    });
    describe('Test search', () => {
      it('tests if search returns results when inputs string', () => {
        if (cy.window().its('store').invoke('getState').its('app').its('config').its('has_search')) {
          cy.get('[class^="Tabs_tabs_"]').contains('Search').should('be.visible').click();
          cy.get('[class^="Browser_treePanel_"]').should('not.be.visible');
          cy.get('[class^="Items_items_"]').should('not.be.visible');
          cy.get('form[class^="Search_search_"]').as('form').find('input').as('input').type('test');
          cy.get('@form').submit();
          cy.get('table[class^="ItemsTable_table_"]').should('be.visible').find('tbody').children().its('length').should('be.greaterThan', 3);
          cy.get('@input').clear().type('a{enter}');
          cy.get('table[class^="ItemsTable_table_"]').should('be.visible').find('tbody').children().should('not.be.visible');
          cy.get('@input').clear();
          cy.get('@form').find('button[type="submit"]').click();
          cy.get('table[class^="ItemsTable_table_"]').should('not.be.visible');
        }
      });
    });
    describe('Closes content browser', () => {
      it('clicks on Cancel in footer and closes content browser', () => {
        cy.get('[class^="Footer_actions_"]').contains('Cancel').click();
        cy.get('[class^="Browser_browser_"]').should('not.be.visible');
      });
    });
    describe('Open Browser and select items', () => {
      it('open content browser on button click', () => {
        cy.openContentBrowser();
      });
      it('selects first three items from items list', () => {
        cy.get('[class^="Footer_actions_"]').contains('Confirm').should('be.disabled');
        Cypress._.times(3, (i) => {
          cy.get('table[class^="ItemsTable_table"] tbody').children().eq(i).children().eq(0).find('label').click();
        })
        cy.get('[class^="Footer_actions_"]').contains('Confirm').should('not.be.disabled');
      });
      it('has three selected items in store', () => {
        cy.checkSelectedItemsLength(3);
      });
      describe('Remove items', () => {
        it('removes one selected item', () => {
          cy.get('[class^="Footer_items"]').find('button').last().click();
          cy.checkSelectedItemsLength(2);
        });
      });
      describe('Close browser', () => {
        it('closes browser with two selected items', () => {
          cy.get('[class^="Footer_actions_"]').contains('Confirm').should('not.be.disabled').click();
        });
        it('checks if two selected items are displayed', () => {
          cy.get('.js-multiple-browse').find('.items').as('items').find('.item').its('length').should('be.eq', 2);
          cy.window().its('store').invoke('getState').its('app').its('selectedItems').each((item) => {
            cy.get('@items').contains(item.name);
          }).then((items) => {
            cy.wrap(items).its('length').should('be.eq', 2);
          });
        })
      });
    });
    describe('Open browser with disabled items', () => {
      it('opens content browser and checks if two items disabled', () => {
        cy.openContentBrowser();
        cy.window().its('store').invoke('getState').its('app').its('disabledItems').its('length').should('be.eq', 2);
        Cypress._.times(2, (i) => {
          cy.get('table[class^="ItemsTable_table"] tbody').children().eq(i).children().eq(0).find('input[type="checkbox"]').should('be.disabled');
        })
      });
      it('selects first available item from items', () => {
        cy.get('table[class^="ItemsTable_table"] tbody').find('input[type="checkbox"]:not(:disabled)').first().parent().find('label').click().parents('td').invoke('text').then((text) => {
          cy.get('[class^="Footer_items"]').should('contain', text);
        });
      });
    })
    describe('Close browser', () => {
      it('closes browser with three selected items', () => {
        cy.get('[class^="Footer_actions_"]').contains('Confirm').should('not.be.disabled').click();
      });
      it('checks if three selected items are displayed', () => {
        cy.get('.js-multiple-browse').find('.items').as('items').find('.item').its('length').should('be.eq', 3);
      })
    });
  });
});
