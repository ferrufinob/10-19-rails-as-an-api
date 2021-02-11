class ItemSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :category
  attributes :name, :price, :description, :category_id, :category_name
  

  # attribute :cat_name do |object|
  #   "#{object.name} (#{object.year})"
  # end
  
  # attribute :name do |object|
  #   "#{object.name} Part 2"
  # end
end
