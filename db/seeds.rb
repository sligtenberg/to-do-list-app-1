users = User.create([
    {username: "Stephen", password: "123"},
    {username: "John",    password: "456"},
    {username: "Maddie",  password: "789"}
])

lists = List.create([
  {name: "Groceries"},          # 1
  {name: "Moving"},             # 2
  {name: "School"},             # 3
  {name: "Work"},               # 4
  {name: "Car"},                # 5
  {name: "At Camp Ligtenberg"}, # 6
  {name: "School"},             # 7
  {name: "Work"},               # 8
  {name: "Soccer"},             # 9
  {name: "Shopping"},           # 10
  {name: "Gear Repairs"},       # 11
  {name: "Household"},          # 12
  {name: "Household"},          # 13
  {name: "Game"},               # 14
  {name: "Wishlist"}            # 15
])

user_list = UserList.create([
  {user_id: users[0].id, list_id: lists[0].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[1].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[2].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[3].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[4].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[5].id , owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[9].id , owner: false, participant: false},
  {user_id: users[0].id, list_id: lists[10].id, owner: true , participant: true},
  {user_id: users[0].id, list_id: lists[12].id, owner: false, participant: true},
  {user_id: users[0].id, list_id: lists[14].id, owner: true , participant: true},

  {user_id: users[1].id, list_id: lists[7].id , owner: true , participant: true},
  {user_id: users[1].id, list_id: lists[8].id , owner: true , participant: true},
  {user_id: users[1].id, list_id: lists[13].id, owner: true , participant: true},
  {user_id: users[1].id, list_id: lists[14].id, owner: false, participant: false},
  {user_id: users[1].id, list_id: lists[11].id, owner: true , participant: true},

  {user_id: users[2].id, list_id: lists[0].id , owner: true , participant: true},
  {user_id: users[2].id, list_id: lists[6].id , owner: true , participant: true},
  {user_id: users[2].id, list_id: lists[9].id , owner: true , participant: true},
  {user_id: users[2].id, list_id: lists[1].id , owner: false, participant: true},
  {user_id: users[2].id, list_id: lists[10].id, owner: false, participant: true},
  {user_id: users[2].id, list_id: lists[12].id, owner: true , participant: true},
  {user_id: users[2].id, list_id: lists[14].id, owner: false, participant: false}
])

tasks = Task.create([
  {list_id: lists[0].id, description: "Milk"   , completed: false},
  {list_id: lists[0].id, description: "Eggs"   , completed: false},
  {list_id: lists[0].id, description: "Beer"   , completed: false},
  {list_id: lists[0].id, description: "Cookies", completed: true},

  {list_id: lists[1].id, description: "Pack clothes", completed: false, due_date: Time.new(2023, 8, 15)},
  {list_id: lists[1].id, description: "Pack books"  , completed: false, due_date: Time.new(2023, 8, 15)},
  {list_id: lists[1].id, description: "Pack food"   , completed: false, due_date: Time.new(2023, 8, 15)},
  {list_id: lists[1].id, description: "Rent trailer", completed: false, due_date: Time.new(2023, 8, 15)},

  {list_id: lists[2].id, description: "Final Project", completed: false, due_date: Time.new(2023, 9, 1)},
  {list_id: lists[2].id, description: "Code Wars"    , completed: false, due_date: Time.new(2023, 9, 15)},
  {list_id: lists[2].id, description: "Resume"       , completed: true , due_date: Time.new(2023, 8, 15)},

  {list_id: lists[4].id, description: "Oil"         , completed: true},
  {list_id: lists[4].id, description: "Registration", completed: true, due_date: Time.new(2023, 7, 30)},
  {list_id: lists[4].id, description: "Spark Plugs" , completed: true},
  {list_id: lists[4].id, description: "Detail"      , completed: true},

  {list_id: lists[5].id, description: "Shed siding", completed: false},
  {list_id: lists[5].id, description: "Build bed"  , completed: false},
  {list_id: lists[5].id, description: "Paint room" , completed: true},

  {list_id: lists[6].id, description: "Study for NCLEX", completed: false, due_date: Time.new(2023, 8, 29)},

  {list_id: lists[7].id, description: "Meetings", completed: false},

  {list_id: lists[8].id, description: "Sign up for fall", completed: true},

  {list_id: lists[9].id, description: "Climbing shoes", completed: false},
  {list_id: lists[9].id, description: "Bike tires"    , completed: false},

  {list_id: lists[10].id, description: "Apron"    , completed: true},
  {list_id: lists[10].id, description: "Bills Bag", completed: false},
  {list_id: lists[10].id, description: "Buckles"  , completed: true},

  {list_id: lists[11].id, description: "Vaccum", completed: true},

  {list_id: lists[12].id, description: "Wash Windows", completed: false},

  {list_id: lists[13].id, description: "AI enemy", completed: true},

  {list_id: lists[14].id, description: "Vacation!", completed: false}
])