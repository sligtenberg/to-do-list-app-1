require 'rails_helper'

# before do
#   @user = FactoryBot.create(:user)
# end

describe "Sessions", type: :request do
  let!(:user) { User.create(username: 'Fake User', password: "123") }

  describe "POST /login" do
    it 'returns the logged in user' do
      post "/login", params: { username: user.username, password: user.password }

      expect(response.body).to include_json({ 
        username: user.username
      })
    end

    it 'sets the user ID in the session' do
      post "/login", params: { username: user.username, password: user.password }

      expect(session[:user_id]).to eq(user.id)
    end
  end
  
  describe "DELETE /logout" do
    before do
      post "/login", params: { username: user.username, password: user.password }
    end

    it 'returns no content' do
      delete "/logout"

      expect(response).to have_http_status(:no_content)
    end

    it 'deletes the user ID from the session' do
      delete "/logout"

      expect(session[:user_id]).to eq(nil)
    end
  end

end
