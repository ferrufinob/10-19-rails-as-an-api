class Item < ApplicationRecord
  belongs_to :category

  def naming
    self.name.upcase
  end

  def category_name=(cat_name)
    if !cat_name.blank?
      self.category = Category.find_or_create_by(name: cat_name.downcase)
    end
  end


  def category_name 
    self.category.name
  end
end
