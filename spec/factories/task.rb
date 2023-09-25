FactoryBot.define do
  factory :task do
    description { "Fake Task" }
    completed { false }
    association :list, factory: :list
  end
end