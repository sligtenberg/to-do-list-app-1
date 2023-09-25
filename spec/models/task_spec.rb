describe Task, type: :model do

  before do
    @list = FactoryBot.create(:list)
    @task = FactoryBot.create(:task)
  end

  describe 'associations' do
    it { should belong_to(:list) }
  end

  describe 'validations' do
    #   validates_inclusion_of :completed, in: [true, false] is discouraged in shoulda documentation
    it { should validate_uniqueness_of(:description).scoped_to(:list) }
  end
end