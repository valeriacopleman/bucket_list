class CreateThings < ActiveRecord::Migration[6.0]
  def change
    create_table :things do |t|
      t.string :description
      t.integer :bucket_id

      t.timestamps
    end
  end
end
