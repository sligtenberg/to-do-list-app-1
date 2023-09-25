describe ListsController, type: :controller do

  describe 'route actions' do
    it { should route(:post, '/lists').to(action: :create) }
    it { should route(:delete, '/lists/:id').to(action: :destroy) }
  end
  
end