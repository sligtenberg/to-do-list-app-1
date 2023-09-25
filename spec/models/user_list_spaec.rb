describe UserList, type: :model do

  before do
    @user = FactoryBot.create(:user)
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:list) }
  end

  describe 'validations' do
    #   validates_inclusion_of :completed, in: [true, false] is discouraged in shoulda documentation
    it { should validate_uniqueness_of(:list).scoped_to(:user) }
  end

end