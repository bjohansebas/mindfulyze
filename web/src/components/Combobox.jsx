import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Button, ButtonGroup } from '@mui/material'
import PropTypes from 'prop-types'

function Combobox ({ options, setOptionSelect }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setOptionSelect(options[selectedIndex])
  }, [selectedIndex])

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => setOpen((prevOpen) => !prevOpen)

  const handleClose = (event) => {
    if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
      setOpen(false)
    }
  }

  return (
    <Box>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button>{options[selectedIndex].text}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

Combobox.propTypes = {
  options: PropTypes.array,
  setOptionSelect: PropTypes.any
}

export { Combobox }
