"""
    Factors in Cracking Speed:
    	• On a modern computer (8 core, 2.8 GHz) using the SHA512 hashing algorithm,
        it takes about 0.0017 milliseconds to compute a hash. This translates to about
        1.7*10^-6 seconds per password

    	• A GPU or 3D graphics card can usually calculate hashes at a speed of 50-100
        times the speed of the CPU

    	• estimate that a supercomputer or botnet is able to perform calculations and
        hashes at a speed of 100000 times a regular computer

    		○ the 100k computers on a botnet is very doable, the largest one to-date
            is estimated to have 12 million computers involved!

    On average the password will be cracked when half of the possible passwords are
    checked  (statistically speaking)

    ----------------------------------------------------------------------------
    Computing Password Complexity:

		Things we'll want to find on this
			# of seconds
			# of minutes (if applicable)
			# of hours ^^^
			# of days
			# of years

        Optional:
            # of computer cores
            - speed of computer finding the password

    ** will need to do the math for each and display any of the timeframes (after seconds)
    if there is a number in front of the decimal point

"""
import hashlib, re, pdb

# ---------------------------- CALCULATE_COMPLEXITY ----------------------------
def calculate_complexity(password):
    # --- need to determine which character sets are present in the password ---
    possible_chars = 0
    lower = upper = nums = symbs = False #bool values to state what types of chars are present
    # vvv check for lowercase (26 possible chars) vvv
    if re.search('[a-z]', password):
        lower = True
        possible_chars += 26
    # vvv check for uppercase (26 possible chars) vvv
    if re.search('[A-Z]', password):
        upper = True
        possible_chars += 26
    # vvv check for numbers (10 possible chars) vvv
    if re.search('[0-9]', password):
        nums = True
        possible_chars += 10
    # vvv check for symbols (32 chars ((that are on the American keyboard))) vvv
    if re.search('[\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\[\{\]\}\|\\\;\:\'\"\,\<\.\>\/\?]+', password):
        symbs = True
        possible_chars += 32
    #
    # actual complexity is just an estimate based on how long it'll stand up to a brute force attack
    # also assuming that it takes our given computer 0.0000017 seconds to compute a hash
    # half of the time the password will be in the first half of all possible passwords... (divide by 2)
    #
    seconds = (((1.7*(10**-6)) * (possible_chars ** len(password)))) / 2
    minutes = seconds/60
    hours = minutes/60
    days = hours/24
    years = days/365
    timeArr = [seconds,minutes,hours,days,years]
    timeKeys = ['seconds','minutes','hours','days','years']
    timeDict = {}
    # --- remove items (except seconds) from timeDict if less they are less than zero ---
    counter = 0
    for item in timeArr:
        # --- format times to only have 2 decimal points if greater than 1 unit ---
        if item >= 1:
            item = "{:.2f}".format(item)
        #
        # --- add all times greater than 1 unit to the dictionary ---
        # pdb.set_trace()
        if float(item) >= 1 or counter == 0:
            timeDict[timeKeys[counter]] = item
        counter += 1

    bools = {"lowercase letters":lower,"uppercase letters":upper,"numbers":nums,"symbols":symbs}
    #
    # create context dictionary to be passed back to views.py
    context = {
        'length':str(len(password)),
        'possible characters':possible_chars,
        'bools':bools,
        'times': timeDict,
    }
    #
    return context

# -------------------------------- CREATE_HASH ---------------------------------
def create_hash(password):
    # --- create hash, sha3_512 should not be vulnerabel to collisions ---
    m = hashlib.sha3_512(password.encode('utf-8'))
    hash = m.hexdigest()
    return hash
