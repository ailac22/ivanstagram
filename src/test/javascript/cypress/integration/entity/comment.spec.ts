import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Comment e2e test', () => {
  const commentPageUrl = '/comment';
  const commentPageUrlPattern = new RegExp('/comment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'admin';
  const password = Cypress.env('E2E_PASSWORD') ?? 'admin';
  const commentSample = { comment: 'Optional', createdAt: '2021-12-03T20:20:01.771Z' };

  let comment: any;
  //let user: any;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });
    cy.visit('');
    cy.login(username, password);
    cy.get(entityItemSelector).should('exist');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"login":"extend","firstName":"Collin","lastName":"McCullough"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/comments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/comments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/comments/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

  });
   */

  afterEach(() => {
    if (comment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/comments/${comment.id}`,
      }).then(() => {
        comment = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Comments menu should load Comments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('comment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Comment').should('exist');
    cy.url().should('match', commentPageUrlPattern);
  });

  describe('Comment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Comment page', () => {
        cy.get(entityCreateButtonSelector).click({ force: true });
        cy.url().should('match', new RegExp('/comment/new$'));
        cy.getEntityCreateUpdateHeading('Comment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/comments',
  
          body: {
            ...commentSample,
            owner: user,
          },
        }).then(({ body }) => {
          comment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/comments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [comment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(commentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(commentPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response!.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Comment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('comment');
        cy.get(entityDetailsBackButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commentPageUrlPattern);
      });

      it('edit button click should load edit Comment page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Comment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click({ force: true });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commentPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Comment', () => {
        cy.intercept('GET', '/api/comments/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('comment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', commentPageUrlPattern);

        comment = undefined;
      });
    });
  });

  describe('new Comment page', () => {
    beforeEach(() => {
      cy.visit(`${commentPageUrl}`);
      cy.get(entityCreateButtonSelector).click({ force: true });
      cy.getEntityCreateUpdateHeading('Comment');
    });

    it.skip('should create an instance of Comment', () => {
      cy.get(`[data-cy="comment"]`).type('exploit').should('have.value', 'exploit');

      cy.get(`[data-cy="createdAt"]`).type('2021-12-04T01:05').should('have.value', '2021-12-04T01:05');

      cy.get(`[data-cy="owner"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        comment = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', commentPageUrlPattern);
    });
  });
});
