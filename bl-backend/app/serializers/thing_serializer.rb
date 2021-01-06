class ThingSerializer < ActiveModel::Serializer
  attributes :id, :description, :bucket_id
end
