class Thing < ApplicationRecord
    belongs_to :bucket
    validates :description, presence: true
end
