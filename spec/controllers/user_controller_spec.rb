# describe UsersController, type: :controller do

#   describe 'route actions' do
#     let!(:user1) { User.create(username: 'Fake User1', password: '123') }
#     let!(:user2) { User.create(username: 'Fake User2', password: '123') }
  
#     it { should route(:post, '/users').to(action: :create) }
#     # it { should route(:get, '/users/me').to(action: :show, id: @current_user.id) }  describe "GET /me" do

#     it 'returns the first user when the first user is logged in' do
#       # log the user in first
#       post "/login", params: { username: user1.username, password: user1.password }
#       get "/me"

#       expect(response.body).to include_json({ 
#         username: user1.username
#       })
#     end

#     it 'returns the second user when the second user is logged in' do
#       # log the user in first
#       post "/login", params: { username: user2.username }
#       get "/me"

#       expect(response.body).to include_json({ 
#         id: user2.id, username: user2.username
#       })
#     end

#   end

# end
