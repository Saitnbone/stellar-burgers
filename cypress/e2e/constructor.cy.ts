describe('Тестирование функционирования приложения', () => {
  before(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'ingredients'}`);
  });

  beforeEach(() => {
    cy.viewport(1300, 800);
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as(`${'user'}`);

    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockReshToken');

    cy.visit('/');
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
  });

  it('Моковые данные для ингредиентов', () => {
    cy.wait(['@ingredients']);
  });

  // Проверка работы модальных окон
  describe('Тестирование функционирования модальных окон', () => {
    beforeEach(() => {
      const ingredient = cy.contains('Мясо бессмертных моллюсков Protostomia');
      ingredient.click();
    });

    it('Открытие модального окна ингредиента', () => {
      // Проверка, что модальное окно открылось
      cy.contains('Детали ингридиента').should('exist');
    });

    it('Закрытие модального окна ингредиента при нажатии на кнопку закрытия', () => {
      const closeX = cy.get(`[data-cy="ingredient-details"]`);
      closeX.click();

      cy.contains('Детали ингридиента').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.contains('Детали ингридиента').should('exist');

      cy.get('body').type('{esc}');

      cy.contains('Детали ингридиента').should('not.exist');
    });
  });

  // Блок тестов добавление ингредиентов в конструктор бургера
  describe('Тестирование добавление ингредиентов товаров в конструктор', () => {
    it('Добавление булки в конструктор', () => {
      const bunsIngredients = cy.get('h3').contains('Булки').next('ul');
      const bunsAddButton = bunsIngredients.contains('Добавить');

      cy.get('div').contains('Выберите булки').should('exist');

      bunsAddButton.click();

      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('Добавление ингредиента в конструктор', () => {
      const mainsIngredients = cy.get('h3').contains('Начинки').next('ul');
      const mainsAddButton = mainsIngredients.contains('Добавить');

      cy.get('div').contains('Выберите начинку').should('exist');

      mainsAddButton.click();

      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  // Блок тестов оформления заказов
  describe('Тестирование оформления заказов', () => {
    it('Проверка пользователя', () => {
      cy.contains('user').should('exist');
    });

    it('Нажатие кнопки оформления заказа', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as(`${'order'}`);

      const buns = cy.get('h3').contains('Булки').next('ul');
      const bunsAddButton = buns.contains('Добавить');
      bunsAddButton.click();

      const mains = cy.get('h3').contains('Начинки').next('ul');
      const mainsAddButton = mains.contains('Добавить');
      mainsAddButton.click();

      const orderRequestButton = cy.contains('Оформить заказ');
      orderRequestButton.click();

      cy.contains('1');

      cy.get('body').type('{esc}');

      cy.contains('36112').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
