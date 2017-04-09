require "rails_helper"

RSpec.describe "search page", :type => :feature do
  before do 
    visit '/'
  end

  it "display results", js: true do
    expect(page).to have_content 'Alaska Airlines'
  end

  it 'display 20 hits per page', js: true do
    within('div#container') do
      expect(page).to have_selector('div.hit-card', count: 20)
    end
  end

  # test select filter
  it "display most populare", js: true do
    select('Most populare', from: 'filter-select')
    expect(page).to have_content 'Google Earth'
    expect(page).to have_content 'ESPN ScoreCenter'
    expect(page).to have_content 'Facebook'
  end

  it "display less populare", js: true do
    select('Less populare', from: 'filter-select')
    expect(page).to have_content 'TurboTax SnapTax'
    expect(page).to have_content 'Secure Photo'
    expect(page).to have_content 'Ringtone' 
  end

  it 'display most relevant', js: true do 
    select('Most relevant', from: 'filter-select')
    expect(page).to have_content 'Alaska Airlines'
  end

  # test select pages 
  it 'diplay 5 hits if select 5', js: true do
    select("5", from: 'select-pages')
    within('div#container') do 
      expect(page).to have_selector('div.hit-card', count: 5)
    end
  end

  it 'diplay 10 hits if select 10', js: true do
    select("10", from: 'select-pages')
    within('div#container') do 
      expect(page).to have_selector('div.hit-card', count: 10)
    end
  end

  it 'diplay 15 hits if select 15', js: true do
    select("15", from: 'select-pages')
    within('div#container') do 
      expect(page).to have_selector('div.hit-card', count: 15)
    end
  end

  it 'diplay 20 hits if select 20', js: true do
    select("20", from: 'select-pages')
    within('div#container') do 
      expect(page).to have_selector('div.hit-card', count: 20)
    end
  end

  it 'diplay 50 hits if select 50', js: true do
    select("50", from: 'select-pages')
    within('div#container') do 
      expect(page).to have_selector('div.hit-card', count: 50)
    end
  end

  # test category checkbox
  it 'display book category if books is selected', js: true do
    check('fl-Books')
    expect(page).to have_content('Barnes & Noble')
  end
end