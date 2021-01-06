class ThingSerializer < ActiveModel::Serializer
  attributes :id, :description, :bucket_id
  belongs_to :bucket
end
