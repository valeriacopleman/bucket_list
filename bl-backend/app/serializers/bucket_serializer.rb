class BucketSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :things
end
