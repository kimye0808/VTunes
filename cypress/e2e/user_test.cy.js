describe('UI End-to-End Test', () => {
  it('Connects to the application', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
  })
  it('Renders the default screen elements', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    //cy.get('[data-testid="Vtunes_Helmet"]').should("exist");
    cy.get('.rhap_main-controls-button').should("exist");
    cy.get('.rhap_play-pause-button').should("exist");
    cy.get('.rhap_volume-controls').should("exist");
    cy.get('.rhap_volume-button').should("exist");
    cy.get('.rhap_additional-controls').should("exist");
    cy.get('.rhap_progress-section').should("exist");
  })
  it('Loads file and plays the music', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    

    cy.get('[cypress-testid="adder_button"]')
        .should("exist")
    //cy.get('input[type="file"]').selectFile('cypress/fixtures/01. Attention.mp3', {force: true})

    cy.get('[cypress-testid="remover_button"]')
        .should("exist")
    
  })
  it('Creates Playlist', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
  
    cy.get('[cypress-testid="playlist_menu"]')
        .should("exist")
        .click();
    cy.get('[cypress-testid="new_playlist_button"]')
        .should("exist")
        .click();

    cy.get('[cypress-testid="playlist_name_input"]').type("Cancel");
    cy.get('[cypress-testid="cancel_button"]')
        .trigger("mouseover")
        .click()

    cy.get('[cypress-testid="new_playlist_button"]')
        .should("exist")
        .click();

    cy.get('[cypress-testid="playlist_name_input"]').type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}Hello World");
    cy.get('[cypress-testid="confirm_button"]')
        .trigger("mouseover")
        .click()

  })

  it('Prints Invalid Playlist when input is empty', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)

    cy.get('[cypress-testid="playlist_menu"]')
        .should("exist")
        .click();
    cy.get('[cypress-testid="new_playlist_button"]')
        .should("exist")
        .click();
    cy.get('[cypress-testid="confirm_button"]')
        .trigger("mouseover")
        .click()
  })
  
  it('Set Timer', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="timer_button"]')
        .should("exist")
        .click();
    cy.wait(1000);
    cy.get('[cypress-testid="timer_30min"]')
        .should("exist")
        .click();
    cy.wait(1000);

  })

  it('Reset Timer', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="time_left"]')
        .should("exist")
        .trigger("mouseover")
        .click();
  })
  
  it('Modify Shuffle State', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="shuffle_button"]')
        .should("exist")
        .click()
  })

  it('Modify Repeat State', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="repeat_button"]')
        .should("exist")
        .click()
    cy.wait(1000)
    cy.get('[cypress-testid="repeat_button"]').click()
    cy.wait(1000)
    cy.get('[cypress-testid="repeat_button"]').click()
  })
  
  it('Modify Mute State', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('.rhap_volume-button').should("exist")
        .click()
    cy.wait(1000)
    cy.get('.rhap_volume-button').click();
  })
  
  it('Move volume pin', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('.rhap_volume-indicator').should("exist")
        //.trigger('mousedown')
    /*cy.get('@pin').trigger('mousedown', { which: 1 }); // Start dragging
    cy.get('@pin').trigger('mousemove', { clientX: 10 }); // Drag to a specific position
    cy.get('@pin').trigger('mouseup'); // Drop the pin*/
    
  })

  it('Main Music Controls', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    //Play-pause button
    cy.get('.rhap_play-pause-button').should("exist")
        .click()
    //Prev-music button and Next-music button
    //The two buttons have the same names
    cy.get('.rhap_skip-button').first().should("exist")
        .click()

    cy.get('.rhap_skip-button').eq(1).should("exist")
        .click()


  })

  it('Lyrics on Album Click', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="show_lyrics_button"]')
        .should("exist")
        .click()
    //실제 노래가 들어가 있어야 가능
    cy.get('[cypress-testid="show_album_button"]')
        .should("exist")
        .click()

  })

  it('Search Music in Playlist', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="search_bar"]').should("exist").type("영현이 애창곡")
    cy.wait(2000)
    cy.get('[cypress-testid="search_bar"]').should("exist").type("{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}attention")

  })

  it('Remove music from current playlist', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="remover_button"]')
        .should("exist")
        .click()
    cy.get('[cypress-testid="delete_music_button"]')
        .should("exist")
        .click();

  })

  it('Toggle current Playlist button', () => {
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="playlist_menu"]')
        .should("exist")
        .click();
    //select a playlist
    cy.get('[cypress-testid"playlist_enter"]')
        .should("exist")
        .click();
    cy.get('[cypress-testid="current_playlist_button_inactive"]')
        .should("exist")
        .click()
  })


  it('Delete Playlist', () =>{
    cy.visit('localhost:3000')
    cy.viewport(1200, 800)
    cy.get('[cypress-testid="playlist_menu"]')
        .should("exist")
        .click();
    cy.get('[cypress-testid="delete_playlist_button"]')
        .should("exist")
        .click();
    //PlaylistItem.jsx
    cy.get('[cypress-testid="delete_button"]')
        .should("exist")
        .click();

  })

})
