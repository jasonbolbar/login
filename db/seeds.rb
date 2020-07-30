User.create(email: 'superadmin@login.localhost', password: 'admin', first_name: 'Super', last_name: 'Admin', is_admin: true)
(1..65).each do |item|
  app = Application.create(
      name: "App #{item}",
      redirect_uri: "http://localhost:30#{item}"
  )
  (1..7).each do |sub_item|
    app.roles.create(name:"#{app.name} - Role #{sub_item}")
  end
  app.reload
  (1..5).each do |sub_item|
    app.users.create(
        first_name: app.name,
        last_name: "User #{sub_item}",
        email:"#{app.name.sub(' ','').underscore}_user#{sub_item}@login.localhost",
        role_ids: app.role_ids.sample(3)
    )
  end
end
