describe ApplicationController, type: :controller do

  it { should rescue_from(ActiveRecord::RecordInvalid).with(:render_unprocessable_entity_response) }
  it { should use_before_action(:authorize) }

end