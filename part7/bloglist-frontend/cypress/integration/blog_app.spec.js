describe('Blog app', function(){
	const url = 'http://localhost:3002'
	
	
	beforeEach(function(){
		cy.request('POST', `${url}/api/testing/reset`)
		const user = {
			name: 'Chakotay',
			username: 'chakotay',
			password: 'akoocheemoya'
		}
		cy.request('POST', `${url}/api/users/`, user)
		cy.debug()
		cy.visit(url)
	})

	it('front page can be opened', function(){
		cy.contains('blogs')
	})

	it('login form can be opened', function(){
		cy.contains('login').click()
	})

	describe('Login', function(){
		it('user can login', function(){
			cy.contains('login').click()
			cy.get('#username').type('chakotay')
			cy.get('#password').type('akoocheemoya')
			cy.get('#login-button').click()

			cy.contains('logged-in')
		})
		
		it('error message when logging in with invalid credentials', function(){
			cy.contains('login').click()
			cy.get('#username').type('abc')
			cy.get('#password').type('def')
			cy.get('#login-button').click()
			cy.contains('Wrong Credentials')
		})

	})

	describe('when logged in', function(){
		beforeEach(function(){
			cy.contains('login').click()
			cy.get('#username').type('chakotay')
			cy.get('#password').type('akoocheemoya')
			cy.get('#login-button').click()
		}) 

		it('a new blog can be created', function(){
			cy.contains('create new blog').click()
			cy.get('#title').type('this is a test blog')
			cy.get('#author').type('john appleseed')
			cy.get('#url').type('example.com')
			cy.get('#submit-button').click()
			cy.contains('this is a test blog')
		})

		describe('blog actions', function(){
			beforeEach(function(){
				cy.contains('create new blog').click()
				cy.get('#title').type('this is a test blog')
				cy.get('#author').type('john appleseed')
				cy.get('#url').type('example.com')
				cy.get('#submit-button').click()
				cy.contains('view').click()
			})
	
			it('a blog can be liked', function(){
				cy.contains('like').click()
				cy.contains('Likes: 1')
			})
	
			it('a blog can be deleted by the user who created it', function(){
				cy.contains('delete')
			})

			it('users cannot delete blog created by another user', function(){
				cy.contains('logout').click()
				cy.contains('delete').should('not.exist')
			})

			it('blogs are sorted in descending order by likes', function(){
				cy.contains('like').click()
				cy.contains('like').click()
				cy.contains('hide').click()
				cy.contains('create new blog').click()
				cy.get('#title').clear()
				cy.get('#title').type('this is a test blog1')
				cy.get('#author').clear()
				cy.get('#author').type('john appleseed1')
				cy.get('#url').clear()
				cy.get('#url').type('example.com')
				cy.get('#submit-button').click()
				cy.wait(4000)
				cy.get('#openButton').first().click()
				cy.contains('Likes: 2')
			})
		})



	})

})

