module.exports = {
    nets: {
      SDA: undefined,
      SCL: undefined,
      VCC: 'VCC',
      GND: 'GND'
    },
    params: {
      class: 'OLED',
	    side: 'F'
    },
    body: p => `
        (module lib:OLED_128x64 (layer F.Cu) (tedit 5E1ADAC2)
        ${p.at /* parametric position */} 

        ${'' /* footprint reference */}        


        
          (attr through_hole)
          (fp_text reference "${p.ref}" (at 0.33 -1.54875 -90) (layer "F.SilkS") ${p.ref_hide}
            (effects (font (size 1.27 1.27) (thickness 0.15)))
            (tstamp 7493e86f-5530-4c1f-8af6-f23d7ccf8b62)
          )
          (fp_text value "OLED" (at 2.35 -0.27125 -90) (layer "F.Fab")
            (effects (font (size 1 1) (thickness 0.15)))
            (tstamp 343f913e-4db2-406f-b50b-1c98e6a276f8)
          )
          (fp_rect (start -13.05 -10.05) (end 13.05 9.05) (layer "Dwgs.User") (width 0.12) (fill none))
          (fp_rect (start -13.25 -13.85) (end 13.25 13.85) (layer "Dwgs.User") (width 0.12) (fill none))
          (pad "1" thru_hole rect (at -3.81 -12.35) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.net.GND.str})
          (pad "2" thru_hole oval (at -1.27 -12.35) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.net.VCC.str})
          (pad "3" thru_hole oval (at 1.27 -12.35) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.net.SCL.str})
          (pad "4" thru_hole oval (at 3.81 -12.35) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.net.SDA.str})
        )
        `
}