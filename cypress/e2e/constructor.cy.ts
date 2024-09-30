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
    it('Открытие модального окна ингредиента', () => {
      // Убедимся, что модальное окно ингредиента отсутствует
      cy.contains('Детали ингридиента').should('not.exist');

      // Выбираем конкретный ингредиент
      const ingredientName = 'Мясо бессмертных моллюсков Protostomia';
      const ingredientCalories = '420';
      const ingredientProteins = '433';
      const ingredientFat = '244';
      const ingredientCarbs = '33';

      // Выполним действие
      const ingredient = cy.contains(ingredientName);
      ingredient.click();

      // Проверим, что модальное окно появилось
      cy.contains('Детали ингридиента').should('exist');

      // Проверка, что в модальном окне отображаются детали выбранного ингредиента
      cy.get(`[data-cy="ingredient-name"]`).should('have.text', ingredientName);
      cy.get(`[data-cy="ingredient-calories"]`).should(
        'contain.text',
        ingredientCalories
      );
      cy.get(`[data-cy="ingredient-proteins"]`).should(
        'contain.text',
        ingredientProteins
      );
      cy.get(`[data-cy="ingredient-fat"]`).should(
        'contain.text',
        ingredientFat
      );
      cy.get(`[data-cy="ingredient-carbs"]`).should(
        'contain.text',
        ingredientCarbs
      );
    });

    it('Закрытие модального окна ингредиента при нажатии на кнопку закрытия', () => {
      const ingredientName = 'Мясо бессмертных моллюсков Protostomia';
      const ingredient = cy.contains(ingredientName);
      ingredient.click();

      // Убедимся, что модальное окно ингредиента присутствует
      cy.contains('Детали ингридиента').should('exist');

      // Выполним действие
      const closeX = cy.get(`[data-cy="ingredient-details"]`);
      closeX.click();

      // Проверим, что модальное окно закрылось
      cy.contains('Детали ингридиента').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      const ingredientName = 'Мясо бессмертных моллюсков Protostomia';
      const ingredient = cy.contains(ingredientName);
      ingredient.click();

      // Убедимся, что модальное окно ингредиента присутствует
      cy.contains('Детали ингридиента').should('exist');

      // Выполним действие - клик по оверлею
      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      // Проверим, что модальное окно закрылось
      cy.contains('Детали ингридиента').should('not.exist');
    });
  });

  // Блок тестов добавления ингредиентов в конструктор бургера
  describe('Тестирование добавления ингредиентов в конструктор', () => {
    it('Добавление булки в конструктор', () => {
      const bunsIngredients = cy.get('h3').contains('Булки').next('ul');
      const bunsAddButton = bunsIngredients.contains('Добавить');

      // Убедимся, что надпись "Выберите булки" присутствует
      cy.get('div').contains('Выберите булки').should('exist');

      // Выполним действие
      bunsAddButton.click();

      // Проверим, что надпись "Выберите булки" исчезла
      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('Добавление ингредиента в конструктор', () => {
      const mainsIngredients = cy.get('h3').contains('Начинки').next('ul');
      const mainsAddButton = mainsIngredients.contains('Добавить');

      // Убедимся, что надпись "Выберите начинку" присутствует
      cy.get('div').contains('Выберите начинку').should('exist');

      // Выполним действие
      mainsAddButton.click();

      // Проверим, что надпись "Выберите начинку" исчезла
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

      // Убедимся, что заказ не оформлен до нажатия кнопки
      cy.contains('36112').should('not.exist');

      // Выполним действие
      orderRequestButton.click();

      // Дождемся запроса заказа и проверим, что он был выполнен
      cy.wait('@order').its('response.statusCode').should('eq', 200);

      // Проверим, что модальное окно отображает номер заказа из фикстуры
      cy.get('[data-cy="order-number"]').should('contain.text', '36112');

      // Закроем модальное окно заказа
      cy.get('body').type('{esc}');

      // Убедимся, что номер заказа больше не отображается
      cy.contains('36112').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
