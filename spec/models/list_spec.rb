describe List, type: :model do

  describe 'associations' do
    it { should have_many(:user_lists).dependent(:destroy) }
    it { should have_many(:users).through(:user_lists) }
    it { should have_many(:tasks).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
  end

end