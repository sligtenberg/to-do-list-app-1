describe User, type: :model do

  before do
    @user = FactoryBot.create(:user)
  end

  describe 'password' do
    it { should have_secure_password }
  end

  describe 'asociations' do
    it { should have_many(:user_lists).dependent(:destroy) }
    it { should have_many(:lists).through(:user_lists) }
    it { should have_many(:tasks).through(:lists) }
  end

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
  end
end