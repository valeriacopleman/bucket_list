class Bucket < ApplicationRecord
    has_many :things
    validates :name, presence: true
end
